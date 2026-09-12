import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Globe, X, ExternalLink, Cpu, Layers } from 'lucide-react';
import Link from 'next/link';
import WordReveal from './WordReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Smart GitHub Raw & Local Image Resolution Component
const ProjectImage = ({ imagePath, repoUrl, alt, style, className, animate, transition, onClick, onError }) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const getCandidateSources = (path, url) => {
    if (!path) return [];
    if (path.startsWith('http://') || path.startsWith('https://')) return [path];

    const candidates = [];
    const filename = path.split('/').pop();

    if (url) {
      const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (match) {
        const owner = match[1];
        const repo = match[2].replace(/\.git$/, '');
        const encodedPath = encodeURI(path);
        const encodedFilename = encodeURIComponent(filename);

        const branches = ['main', 'master'];
        const subpaths = [
          encodedPath,
          encodedFilename,
          `${repo}/${encodedFilename}`,
          `${repo}/${filename}`,
          `Screenshot/${encodedFilename}`,
          `screenshots/${encodedFilename}`,
          `images/${encodedFilename}`,
          `assets/${encodedFilename}`
        ];

        for (const branch of branches) {
          for (const sub of subpaths) {
            const candidateUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${sub}`;
            if (!candidates.includes(candidateUrl)) {
              candidates.push(candidateUrl);
            }
          }
        }
      }
    }

    // Fallback to local image if present
    candidates.push(`/images/projects/${path}`);

    return candidates;
  };

  const sources = getCandidateSources(imagePath, repoUrl);

  const handleImageError = (e) => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(prev => prev + 1);
    } else {
      setHasError(true);
      if (onError) onError(e);
    }
  };

  if (!imagePath || hasError || sources.length === 0) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-panel, #1C1F2B)',
        color: 'var(--color-secondary, #5B7B9A)',
        fontSize: '11px',
        letterSpacing: '0.04em',
        fontFamily: 'Instrument Sans, sans-serif'
      }}>
        <span>{alt || "Project Image"}</span>
      </div>
    );
  }

  if (animate) {
    return (
      <motion.img
        key={sources[srcIndex]}
        src={sources[srcIndex]}
        alt={alt || "Project"}
        onError={handleImageError}
        animate={animate}
        transition={transition}
        style={style}
        className={className}
        onClick={onClick}
      />
    );
  }

  return (
    <img
      key={sources[srcIndex]}
      src={sources[srcIndex]}
      alt={alt || "Project"}
      onError={handleImageError}
      style={style}
      className={className}
      onClick={onClick}
    />
  );
};

const ProjectsGallery = ({ userData, limit }) => {
  const repositories = userData?.github?.repositories || [];

  // Local state for active detail modal
  const [activeProject, setActiveProject] = useState(null);

  // Categories Filtering
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Web Apps", "Mobile Apps", "Data Science", "Artificial Intelligence (AI)", "Machine Learning Engineering"];

  // Keyed mock details with screenshot lists matching project names
  const projectMocksMap = {
    "QuantCore": {
      image: "QuantCore/1.png",
      fit: "cover",
      position: "center",
      impact: "Algorithmic forecasting of equity prices using sequence regression models.",
      tags: ["Python", "LSTM", "Pandas", "Scikit-Learn"],
      demoUrl: null,
      screenshots: ["QuantCore/1.png", "QuantCore/2.jpg", "QuantCore/3.jpg", "QuantCore/4.jpg", "QuantCore/5.jpg", "QuantCore/6.jpg"],
      fullDescription: "An advanced algorithmic forecasting engine designed to predict equity price movements in the Indian Stock Market. Built using Deep Learning LSTM sequence models, the system processes historical tick data, computes volatility metrics, and runs predictive regressions to map trading signals."
    },
    "LegalPal": {
      image: "LegalPal/legalpal.png",
      fit: "cover",
      position: "center",
      impact: "Full-stack legal assistant platform built with high-throughput inference nodes.",
      tags: ["React", "Python", "FastAPI", "LLM Integration"],
      screenshots: [
        "LegalPal/legalpal-dashboard.png",
        "LegalPal/legalpal-chat.png",
        "LegalPal/legalpal-chat2.png",
        "LegalPal/legalpal-chatAI.png",
        "LegalPal/legalpal-ChatAI2.png",
        "LegalPal/legalpal-docanalzer.png",
        "LegalPal/legalpal-docanalzer (2).png",
        "LegalPal/legalpal-IPCpage.png",
        "LegalPal/legalpal-mocktrail.png"
      ],
      fullDescription: "A complete full-stack infrastructure for the LegalPal legal assistance assistant. Integrates high-throughput inference nodes with customized legal context indexing, allowing lawyers and clients to draft contracts, analyze statutes, and query regulations with high precision."
    },
    "Finora": {
      image: "Finora/finora-logo.png",
      fit: "contain",
      position: "center",
      impact: "Comprehensive personal finance and budget management mobile app.",
      tags: ["React Native", "Expo", "SQLite", "Chart.js"],
      demoUrl: null,
      screenshots: [
        "Finora/finora-logo.png",
        "Finora/finora-page1.png",
        "Finora/finora-page2.png"
      ],
      fullDescription: "A modern personal finance and expense tracking mobile application designed to help users structure budgets, track expenses, and visualize financial habits in real-time. Employs secure local storage capabilities, custom categorization, budget capping alert thresholds, and interactive graphical analytics outputs."
    },
    "ConceptLens": {
      image: null,
      fit: "cover",
      position: "center",
      impact: "Visual exploration node framework to map concept relationships.",
      tags: ["React", "D3.js", "GraphDB", "TailwindCSS"],
      demoUrl: null,
      screenshots: [],
      fullDescription: "An interactive, visual concept-mapping node network. Allows researchers to input text datasets and automatically generate node-relationship schemas using Graph databases and dynamic D3.js physics renders."
    },
    "RiceLeaf Disease Detection": {
      image: "RiceLeaf Disease Detection/DS5-Project-1.png",
      fit: "cover",
      position: "center",
      impact: "Automating detection of rice crop diseases using Deep Convolutional Networks.",
      tags: ["Python", "Deep Learning", "TensorFlow / Keras", "Computer Vision", "Streamlit"],
      demoUrl: null,
      screenshots: [
        "RiceLeaf Disease Detection/DS5-Project-1.png",
        "RiceLeaf Disease Detection/DS5-Project-2.png",
        "RiceLeaf Disease Detection/DS5-Project-3.png",
        "RiceLeaf Disease Detection/DS5-Project-4.png",
        "RiceLeaf Disease Detection/DS5-Project-5.png",
        "RiceLeaf Disease Detection/DS5-Project-6.png",
        "RiceLeaf Disease Detection/DS5-Project-7.png",
        "RiceLeaf Disease Detection/DS5-Project-8.png"
      ],
      fullDescription: "A deep learning computer vision model trained to classify multiple types of rice leaf diseases (Bacterial leaf blight, Brown spot, and Leaf smut). Includes an interactive dashboard to upload leaf images and get instant diagnostic reports and treatment guidelines."
    },
    "Customer Transaction Prediction": {
      image: "Customer Transaction Prediction/DS6-Project-1.png",
      fit: "cover",
      position: "center",
      impact: "Predicting customer transaction potentials using classification models.",
      tags: ["Python", "Machine Learning", "LightGBM / XGBoost", "Data Analysis", "Streamlit"],
      demoUrl: null,
      screenshots: [
        "Customer Transaction Prediction/DS6-Project-1.png",
        "Customer Transaction Prediction/DS6-Project-2.png",
        "Customer Transaction Prediction/DS6-Project-3.png",
        "Customer Transaction Prediction/DS6-Project-4.png",
        "Customer Transaction Prediction/DS6-Project-5.png",
        "Customer Transaction Prediction/DS6-Project-6.png",
        "Customer Transaction Prediction/DS6-Project-7.png",
        "Customer Transaction Prediction/DS6-Project-8.png"
      ],
      fullDescription: "A predictive machine learning classifier designed to identify whether a customer will complete a transaction. Leverages light gradient-boosted machines, random forests, and deep feature exploration pipelines, providing businesses with real-time transactional forecasting and conversion analytics."
    },
    "Home Loan Default": {
      image: "Home Loan Default/DS8-Project-1.png",
      fit: "cover",
      position: "center",
      impact: "Predictive classification modeling home loan default risks using financial and demographic indicators.",
      tags: ["Python", "Machine Learning", "Logistic Regression", "EDA", "XGBoost"],
      demoUrl: null,
      screenshots: [
        "Home Loan Default/DS8-Project-1.png",
        "Home Loan Default/DS8-Project-2.png",
        "Home Loan Default/DS8-Project-3.png",
        "Home Loan Default/DS8-Project-4.png",
        "Home Loan Default/DS8-Project-5.png",
        "Home Loan Default/DS8-Project-6.png",
        "Home Loan Default/DS8-Project-7.png",
        "Home Loan Default/DS8-Project-8.png",
        "Home Loan Default/DS8-Project-9.png"
      ],
      fullDescription: "An end-to-end data science classification project designed to identify high-risk home loan applicants and predict default probabilities. Processes historical demographic, credit history, and loan request metrics, implements feature scaling and class balance methods, trains classification pipelines, and generates analytical risk dashboards."
    },
    "Flipkart Project Classifier": {
      image: "Flipkart/Flipkart-1.png",
      fit: "cover",
      position: "center",
      impact: "Deep Learning image classification system built to categorize product categories from Flipkart catalog queries.",
      tags: ["Python", "Deep Learning", "CNN", "Keras", "Image Classification"],
      demoUrl: null,
      screenshots: [
        "Flipkart/Flipkart-1.png",
        "Flipkart/Flipkart-2.png",
        "Flipkart/Flipkart-3.png",
        "Flipkart/Flipkart-4.png",
        "Flipkart/Flipkart-5.png",
        "Flipkart/Flipkart-6.png",
        "Flipkart/Flipkart-7.png",
        "Flipkart/Flipkart-8.png",
        "Flipkart/Flipkart-9.png",
        "Flipkart/Flipkart-10.png",
        "Flipkart/Flipkart-11.png",
        "Flipkart/Flipkart-12.png",
        "Flipkart/Flipkart-13.png"
      ],
      fullDescription: "An end-to-end Computer Vision capstone project built to classify products from the Flipkart catalog. Integrates deep Convolutional Neural Networks (CNNs) using TensorFlow/Keras to analyze product images and accurately predict target categories, streamlining e-commerce queries."
    },
    "Customer Churn Predictor REST API": {
      image: "Customer Churn Analytics/CCA-1.png",
      fit: "cover",
      position: "center",
      impact: "End-to-end machine learning pipeline predicting customer churn with containerized REST API deployments.",
      tags: ["Python", "Machine Learning", "FastAPI", "Docker", "XGBoost"],
      demoUrl: null,
      screenshots: [
        "Customer Churn Analytics/CCA-1.png",
        "Customer Churn Analytics/CCA-2.png",
        "Customer Churn Analytics/CCA-3.png",
        "Customer Churn Analytics/CCA-4.png",
        "Customer Churn Analytics/CCA-5.png",
        "Customer Churn Analytics/CCA-6.png",
        "Customer Churn Analytics/CCA-7.png",
        "Customer Churn Analytics/CCA-8.png",
        "Customer Churn Analytics/CCA-9.png"
      ],
      fullDescription: "An end-to-end Machine Learning capstone project designed to predict customer churn. Integrates advanced exploratory data analysis with hyperparameter-optimized classification models (XGBoost/RandomForest) to identify target churn risks, packaged and deployed via containerized FastAPI REST endpoints."
    },
    "Liver Patient Prediction": {
      image: "Liver Patient Prediction/DS9-1.png",
      fit: "cover",
      position: "center",
      impact: "Predictive healthcare analytics classification system predicting liver disease risks using patient clinical biomarkers.",
      tags: ["Python", "Machine Learning", "Scikit-Learn", "Healthcare Analytics", "Classification"],
      demoUrl: null,
      screenshots: [
        "Liver Patient Prediction/DS9-1.png",
        "Liver Patient Prediction/DS9-2.png",
        "Liver Patient Prediction/DS9-3.png",
        "Liver Patient Prediction/DS9-4.png",
        "Liver Patient Prediction/DS9-5.png",
        "Liver Patient Prediction/DS9-6.png",
        "Liver Patient Prediction/DS9-7.png"
      ],
      fullDescription: "A clinical data science classification project focused on early liver disease diagnosis. Evaluates patient blood biomarkers (bilirubin, albumin, proteins, enzymes) and demographic features using supervised classification pipelines (Random Forests, Support Vector Classifiers), enabling predictive diagnostic decision support."
    },
    "House Price Prediction": {
      image: "House Price Pridiction -Ames/HPP-1.png",
      fit: "cover",
      position: "center",
      impact: "Advanced regression modeling pipeline predicting residential home sale prices using Ames housing features.",
      tags: ["Python", "Machine Learning", "Scikit-Learn", "Regression", "Feature Engineering"],
      demoUrl: null,
      screenshots: [
        "House Price Pridiction -Ames/HPP-1.png",
        "House Price Pridiction -Ames/HPP-2.png",
        "House Price Pridiction -Ames/HPP-3.png",
        "House Price Pridiction -Ames/HPP-4.png",
        "House Price Pridiction -Ames/HPP-5.png",
        "House Price Pridiction -Ames/HPP-6.png"
      ],
      fullDescription: "An advanced Machine Learning regression project implementing high-dimensional feature engineering and regularized regression pipelines (Ridge, Lasso, ElasticNet) alongside gradient boosting estimators to predict residential sale prices from the Ames Housing Dataset."
    },
    "Sign Language Detection": {
      image: "Screenshot/1.png",
      fit: "cover",
      position: "center",
      impact: "Computer Vision & Deep Learning system classifying sign language gestures in real time.",
      tags: ["Python", "OpenCV", "TensorFlow", "Keras", "Deep Learning"],
      demoUrl: null,
      screenshots: [
        "Screenshot/1.png",
        "Screenshot/2.png",
        "Screenshot/3.png"
      ],
      fullDescription: "A real-time Computer Vision and Deep Learning system engineered to detect and classify American Sign Language (ASL) gestures. Processes live video streams, extracts key hand gesture landmarks, and classifies signs using custom trained neural network architectures."
    },
    "Flight Price Prediction": {
      image: "Flight Price Prediction/DS11-1.png",
      fit: "cover",
      position: "center",
      impact: "Predictive machine learning regression model forecasting airline ticket pricing based on flight parameters.",
      tags: ["Python", "Scikit-Learn", "Random Forest", "Feature Engineering", "Jupyter"],
      demoUrl: null,
      screenshots: [
        "Flight Price Prediction/DS11-1.png",
        "Flight Price Prediction/DS11-2.png",
        "Flight Price Prediction/DS11-3.png",
        "Flight Price Prediction/DS11-4.png"
      ],
      fullDescription: "An exploratory data science regression project designed to analyze historical flight ticket prices across Indian airlines. Implements extensive feature extraction (departure/arrival times, stops, duration, carrier), trains ensemble regressor models (Random Forests, Extra Trees), and delivers accurate fare estimation predictions."
    }
  };

  // Merge repositories with mock config
  const projects = repositories.map((repo) => ({
    ...repo,
    mock: projectMocksMap[repo.name] || { image: null, fit: "cover", position: "center", impact: repo.description, tags: [], screenshots: [], fullDescription: repo.description }
  }));

  // Apply limit or filters
  const displayedProjects = limit
    ? projects.slice(0, limit)
    : activeCategory === "All"
      ? projects
      : projects.filter(p => p.category === activeCategory);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const projectsGridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !projectsGridRef.current) return;

    const cards = projectsGridRef.current.querySelectorAll('.project-entry-card');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectsGridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }, projectsGridRef);

    return () => ctx.revert();
  }, [activeCategory, limit]);

  return (
    <section id="work" style={{ padding: '120px 0', borderBottom: '1px solid var(--border-subtle)', background: 'var(--color-base, #13151C)' }}>
      <div className="container">

        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: limit ? '60px' : '40px' }}>
          <span className="font-sans" style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-secondary, #5B7B9A)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
            Delivery Log — Technical Systems
          </span>
          <h2 className="font-serif" style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: '300', lineHeight: '1.1', marginBottom: '16px', color: 'var(--color-text, #EDEAE0)' }}>
            Projects
          </h2>
          <p className="font-sans" style={{ color: 'rgba(237, 234, 224, 0.72)', fontSize: '15px', maxWidth: '520px', margin: '0 auto', fontWeight: '400', lineHeight: '1.6' }}>
            Curated machine learning models, full-stack tools, and experimental software systems.
          </p>
        </div>

        {/* Project Bifurcation Filters (Hide on homepage summary) */}
        {!limit && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '56px'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: activeCategory === cat ? '1px solid var(--border-strong)' : '1px solid var(--border-subtle)',
                  background: activeCategory === cat ? 'var(--bg-dark-800)' : 'rgba(255, 255, 255, 0.01)',
                  color: activeCategory === cat ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* If homepage (limit is set), wrap grid in the preview fade layout */}
        {limit ? (
          <div className="projects-preview-wrapper" style={{
            position: 'relative',
            overflow: 'hidden',
            maxHeight: '620px',
            width: '100%',
            paddingBottom: '80px'
          }}>
            <div
              ref={projectsGridRef}
              key={activeCategory}
              style={{
                display: 'grid',
                gap: '32px'
              }}
              className="projects-grid"
            >
              {displayedProjects.map((project) => (
                <div key={project.name} className="project-entry-card" style={{ opacity: 0 }}>
                  <ProjectCard
                    project={project}
                    onClick={() => setActiveProject(project)}
                  />
                </div>
              ))}
            </div>

            {/* Premium Gradient Overlay with blur */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '240px',
              background: 'linear-gradient(to bottom, rgba(19, 21, 28, 0) 0%, rgba(19, 21, 28, 0.65) 45%, #13151C 100%)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'center',
              paddingBottom: '30px',
              zIndex: 10
            }}>
              <Link
                href="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '12px 28px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--color-text, #EDEAE0)',
                  color: 'var(--color-base, #13151C)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontWeight: '500',
                  letterSpacing: '0.02em',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
                  transition: 'all 250ms ease',
                  cursor: 'pointer'
                }}
                className="view-all-pill-btn"
              >
                <span>View All Projects</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div
              ref={projectsGridRef}
              key={activeCategory}
              style={{
                display: 'grid',
                gap: '32px'
              }}
              className="projects-grid"
            >
              {displayedProjects.map((project) => (
                <div key={project.name} className="project-entry-card" style={{ opacity: 0 }}>
                  <ProjectCard
                    project={project}
                    onClick={() => setActiveProject(project)}
                  />
                </div>
              ))}
            </div>
            
            {/* Dynamic Empty State for filters */}
            {displayedProjects.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 0',
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px'
              }}>
                [ NO PROJECTS DEPLOYED IN THIS CATEGORY YET ]
              </div>
            )}
          </>
        )}
      </div>

      {/* Immersive Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        .projects-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

const getProjectCaseStudyDetails = (name) => {
  const n = name.toLowerCase();
  if (n.includes("stock")) {
    return {
      problem: "Forecasting stock price movements from historical market volatility.",
      achievements: ["Reached 94.2% accuracy using LSTM networks", "Built real-time training sequence chains"]
    };
  }
  if (n.includes("lawyer")) {
    return {
      problem: "Extracting legal clauses and identifying risk items in compliance reports.",
      achievements: ["Reduced document review cycles by 70%", "Built real-time PDF risk highlight system"]
    };
  }
  if (n.includes("foundit")) {
    return {
      problem: "Matching lost items to found item reports using location parameters.",
      achievements: ["Scaled to match multi-neighborhood reports", "Enabled immediate notification logs"]
    };
  }
  if (n.includes("conceptlens")) {
    return {
      problem: "Processing telemetry data arrays and rendering responsive analytics charts.",
      achievements: ["Reduced dashboard render delays by 40%", "Optimized virtualized chart metrics"]
    };
  }
  if (n.includes("finora")) {
    return {
      problem: "Organizing distributed statements and computing budgeting recommendations.",
      achievements: ["Zero-knowledge encryption layer", "Automated transaction categorizations"]
    };
  }
  if (n.includes("tumor")) {
    return {
      problem: "Diagnostic classification of Glioma, Meningioma, and Pituitary tumors from MRI.",
      achievements: ["Achieved 97.4% validation classification score", "Integrated Grad-CAM visual activation maps"]
    };
  }
  if (n.includes("spam")) {
    return {
      problem: "Identifying spam transmissions through dense message text payloads.",
      achievements: ["Processed SMS test sets with 99.1% precision", "Integrated TF-IDF + Naive Bayes"]
    };
  }
  if (n.includes("insurance")) {
    return {
      problem: "Estimating medical premium pricing based on age, BMI, and smoking metrics.",
      achievements: ["Developed highly reliable R² score of 0.89", "Integrated ensemble modeling"]
    };
  }
  if (n.includes("bike")) {
    return {
      problem: "Predicting bike-sharing demand curves across changing weather cycles.",
      achievements: ["Minimized root-mean-squared errors", "Engineered custom temperature features"]
    };
  }
  if (n.includes("rice")) {
    return {
      problem: "Classifying crop infections (Bacterial blight, brown spot) from photos.",
      achievements: ["Reached 96.8% model validation classification score", "Integrated real-time diagnostic reports"]
    };
  }
  if (n.includes("transaction") || (n.includes("customer") && !n.includes("churn"))) {
    return {
      problem: "Classifying customer conversion potentials from web-session logs.",
      achievements: ["Maintained ROC-AUC score of 0.91", "Handled imbalanced datasets using SMOTE"]
    };
  }
  if (n.includes("forest") || n.includes("cover")) {
    return {
      problem: "Diagnostic classification of forest cover types based on cartographic and geological variables.",
      achievements: ["Evaluated cover types using Random Forest models", "Engineered elevation and distance ratios"]
    };
  }
  if (n.includes("loan") || n.includes("default")) {
    return {
      problem: "Predictive classification of home loan default risks to identify high-risk applicants.",
      achievements: ["Handled class imbalances and scaled numeric parameters", "Trained XGBoost and Logistic Regression pipelines"]
    };
  }
  if (n.includes("flipkart")) {
    return {
      problem: "Deep Learning product classification categorizing catalog query categories from images.",
      achievements: ["Developed highly responsive CNN models using Keras", "Implemented high-throughput model evaluation runs"]
    };
  }
  if (n.includes("churn")) {
    return {
      problem: "Identifying high-probability customer churn groups using behavioral analytics and session trends.",
      achievements: ["Configured containerized deployments using Docker and FastAPI", "Trained hyperparameter-optimized classification pipelines"]
    };
  }
  if (n.includes("liver")) {
    return {
      problem: "Predictive clinical classification of patient liver disease risks using blood biomarkers.",
      achievements: ["Evaluated clinical features with Random Forests & SVCs", "Optimized diagnostic sensitivity and recall metrics"]
    };
  }
  if (n.includes("house")) {
    return {
      problem: "Regression prediction of residential property sale prices using Ames housing features.",
      achievements: ["Engineered regularized regression pipelines (Ridge/Lasso/ElasticNet)", "Implemented advanced feature preprocessing and imputation"]
    };
  }
  return {
    problem: "Developing performant backend features and structural modules.",
    achievements: ["Optimized processing cycle efficiencies", "Integrated clean documentation"]
  };
};

// Project Card with Vengeance UI Cursor Proximity Motion
const ProjectCard = ({ project, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const details = project.mock;
  const hasImage = details.image && !imgError;

  // Cursor proximity spring motion values (subtle 3D tilt & magnetic pull)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 240, damping: 22 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3.5, -3.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3.5, 3.5]), springConfig);
  const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-4, 4]), springConfig);

  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        cursor: 'pointer',
        perspective: 1000
      }}
    >
      <motion.div
        className="surface-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          height: '100%',
          position: 'relative',
          background: 'var(--color-panel, #1C1F2B)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '6px',
          rotateX,
          rotateY,
          x: moveX,
          y: moveY,
          transformStyle: 'preserve-3d'
        }}
        whileHover={{ borderColor: 'var(--color-secondary, #5B7B9A)' }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Project Image Area with Smooth Zoom */}
        <div style={{
          height: '160px',
          background: 'var(--color-base, #13151C)',
          borderRadius: '4px',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
          zIndex: 2,
          position: 'relative'
        }}>
          <ProjectImage
            imagePath={details.image}
            repoUrl={project.url}
            alt={project.name}
            onError={() => setImgError(true)}
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: details.fit || 'cover',
              objectPosition: details.position || 'center',
              display: 'block'
            }}
          />
        </div>

        {/* Metadata Role & Domain Tags */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
          <span className="font-sans" style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>
            {project.role || "Developer"}
          </span>
          <span className="font-sans" style={{ fontSize: '11px', fontWeight: '500', color: 'var(--color-secondary, #5B7B9A)', background: 'rgba(91, 123, 154, 0.08)', border: '1px solid rgba(91, 123, 154, 0.2)', borderRadius: '4px', padding: '2px 8px' }}>
            {project.category}
          </span>
        </div>

        {/* Case Study Summary */}
        <div style={{ flex: 1, zIndex: 2, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h3 className="font-sans" style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px', color: 'var(--color-text, #EDEAE0)' }}>
              {project.name}
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '13px',
              lineHeight: '1.6',
              margin: 0,
              fontWeight: '300',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {details.impact}
            </p>
          </div>
        </div>

        {/* Case Study Technologies */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', zIndex: 2 }}>
          {project.languages && Object.keys(project.languages).slice(0, 3).map((lang, lIdx) => (
            <span
              key={`lang-${lIdx}`}
              className="font-mono"
              style={{
                fontSize: '9px',
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid var(--border-strong)',
                borderRadius: '4px',
                padding: '2px 8px',
                color: 'var(--text-secondary)'
              }}
            >
              {lang}
            </span>
          ))}
          {details.tags.slice(0, 2).map((tag, tIdx) => (
            <span
              key={tIdx}
              className="font-mono"
              style={{
                fontSize: '9px',
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '2px 8px',
                color: 'var(--text-muted)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Case Study Action Button */}
        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', zIndex: 2 }}>
          <button style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid var(--border-strong)',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontSize: '10.5px',
            fontFamily: 'JetBrains Mono, monospace',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            Explore Case Study &rarr;
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Immersive Detail Modal Component
const ProjectDetailModal = ({ project, onClose }) => {
  const details = project.mock;
  const hasScreenshots = details.screenshots && details.screenshots.length > 0;
  const caseStudy = getProjectCaseStudyDetails(project.name);

  const [activeImageIndex, setActiveImageIndex] = useState(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % details.screenshots.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + details.screenshots.length) % details.screenshots.length);
      } else if (e.key === 'Escape') {
        setActiveImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, details.screenshots.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 5, 5, 0.96)',
        backdropFilter: 'blur(8px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <motion.div
        data-lenis-prevent
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '90vh',
          background: 'var(--bg-dark-900)',
          border: '1px solid var(--border-strong)',
          borderRadius: '8px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
          overflowY: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ef4444';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.color = '#ef4444';
          }}
        >
          <X size={16} />
        </button>

        {/* Cover Image Block */}
        <div style={{
          height: '300px',
          position: 'relative',
          background: 'var(--bg-dark-950)',
          overflow: 'hidden'
        }}>
          {details.image ? (
            <ProjectImage
              imagePath={details.image}
              repoUrl={project.url}
              alt={project.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: details.fit || 'cover',
                objectPosition: details.position || 'center'
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: 'var(--color-panel, #1C1F2B)'
            }} />
          )}

          {/* Title Layer Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 30%, var(--bg-dark-900) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
            padding: '30px'
          }}>
            <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
              {project.category} / {project.role}
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '400', color: 'var(--text-primary)' }}>
              {project.name}
            </h2>
          </div>
        </div>

        {/* Details Grid Body */}
        <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '40px'
          }} className="modal-grid">

            {/* Left: Full Narrative */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h3 className="font-heading" style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px', color: 'var(--text-primary)' }}>
                  About Project
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.65', margin: 0, fontWeight: '300' }}>
                  {details.fullDescription}
                </p>
              </div>

              {/* Detailed Problem Solved Block */}
              <div style={{ borderLeft: '1px solid var(--border-strong)', paddingLeft: '16px' }}>
                <h4 className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  Problem Solved
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: 0, fontWeight: '300' }}>
                  {caseStudy.problem}
                </p>
              </div>

              {/* Detailed Key Accomplishments */}
              <div>
                <h4 className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                  Key accomplishments & milestones
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {caseStudy.achievements.map((ach, idx) => (
                    <li key={idx} style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'flex', alignItems: 'start', gap: '10px', fontWeight: '300' }}>
                      <span style={{ width: '4px', height: '4px', background: 'var(--text-secondary)', borderRadius: '50%', marginTop: '9px', flexShrink: 0 }} />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Specs & Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Tech Stack Spec List */}
              <div>
                <h4 className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={12} /> Tech Stack
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {details.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono"
                      style={{
                        fontSize: '10px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        padding: '4px 10px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Language Composition Spec List */}
              {project.languages && Object.keys(project.languages).length > 0 && (
                <div>
                  <h4 className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Layers size={12} /> Language Composition
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {Object.entries(project.languages).map(([lang, pct], lIdx) => (
                      <span
                        key={lIdx}
                        className="font-mono"
                        style={{
                          fontSize: '10px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-strong)',
                          borderRadius: '4px',
                          padding: '4px 10px',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {lang}: {pct}%
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-strong)',
                      background: 'rgba(255, 255, 255, 0.01)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: '500',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.04)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.01)'}
                  >
                    <Github size={13} /> Source Code <ExternalLink size={11} />
                  </a>
                )}

                {details.demoUrl && (
                  <a
                    href={details.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      borderRadius: '4px',
                      background: 'var(--text-primary)',
                      color: '#0A0A0B',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: '500',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.9)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--text-primary)'}
                  >
                    <Globe size={13} /> Live Demo <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Screenshots Sub-Gallery */}
          {hasScreenshots && (
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '30px' }}>
              <h4 className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={12} /> Screenshots & Demos (Click to view full size)
              </h4>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '16px'
              }}>
                {details.screenshots.map((src, sIdx) => (
                  <div
                    key={sIdx}
                    onClick={() => setActiveImageIndex(sIdx)}
                    style={{
                      borderRadius: '4px',
                      border: '1px solid var(--border-subtle)',
                      overflow: 'hidden',
                      height: '140px',      height: '140px',
                      background: '#07070a',
                      cursor: 'zoom-in',
                      transition: 'border-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.25)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
                  >
                    <ProjectImage
                      imagePath={src}
                      repoUrl={project.url}
                      alt={`Screenshot ${sIdx + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </motion.div>

      {/* Immersive Lightbox / Zoom Overlay */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(3, 3, 5, 0.98)',
              zIndex: 1200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out'
            }}
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImageIndex(null); }}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-primary)',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev - 1 + details.screenshots.length) % details.screenshots.length);
              }}
              style={{
                position: 'absolute',
                left: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-primary)',
                padding: '16px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>&larr;</span>
            </button>

            {/* Centered Large Image */}
            <motion.div
              key={activeImageIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ maxWidth: '85vw', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onClick={(e) => e.stopPropagation()}
            >
              <ProjectImage
                imagePath={details.screenshots[activeImageIndex]}
                repoUrl={project.url}
                alt={`Screenshot ${activeImageIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.9)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              />
              <div style={{
                textAlign: 'center',
                color: 'var(--text-secondary)',
                marginTop: '20px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                letterSpacing: '1px'
              }}>
                {activeImageIndex + 1} / {details.screenshots.length} (Use Left / Right Arrow keys)
              </div>
            </motion.div>

            {/* Right navigation arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev + 1) % details.screenshots.length);
              }}
              style={{
                position: 'absolute',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-primary)',
                padding: '16px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>&rarr;</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 600px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ProjectsGallery;
