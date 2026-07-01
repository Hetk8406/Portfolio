const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE = path.join(__dirname, '..', 'userProfileData.json');
const verbose = process.argv.includes('--verbose');

function log(...args) {
  if (verbose) {
    console.log(...args);
  }
}

function warn(...args) {
  if (verbose) {
    console.warn(...args);
  }
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'portfolio-updater-script'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch: ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  log('Fetching GitHub repository languages...');
  if (!fs.existsSync(DATA_FILE)) {
    console.error('Data file not found:', DATA_FILE);
    return;
  }

  const rawData = fs.readFileSync(DATA_FILE, 'utf8');
  let data;
  try {
    data = JSON.parse(rawData);
  } catch (e) {
    console.error('Failed to parse userProfileData.json:', e);
    return;
  }

  const repos = data?.userProfileData?.github?.repositories || [];
  let updated = false;

  for (const repo of repos) {
    if (!repo.url) continue;
    const match = repo.url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      log(`Skipping non-repository URL: ${repo.url}`);
      continue;
    }

    const owner = match[1];
    const repoName = match[2];
    const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/languages`;

    try {
      log(`Fetching languages for ${owner}/${repoName}...`);
      const languages = await fetchJson(apiUrl);
      
      // Compute percentages
      const total = Object.values(languages).reduce((sum, val) => sum + val, 0);
      if (total > 0) {
        const langPercentages = {};
        for (const [lang, bytes] of Object.entries(languages)) {
          langPercentages[lang] = parseFloat(((bytes / total) * 100).toFixed(1));
        }
        repo.languages = langPercentages;
        updated = true;
        log(`Successfully fetched languages for ${repoName}:`, langPercentages);
      }
    } catch (err) {
      warn(`Could not fetch languages for ${owner}/${repoName}:`, err.message);
    }
  }

  if (updated) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    log('Successfully updated userProfileData.json with GitHub languages!');
  } else {
    log('No updates written to userProfileData.json.');
  }
}

run().catch(console.error);
