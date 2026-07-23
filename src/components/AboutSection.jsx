import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X } from 'lucide-react';
import WordReveal from './WordReveal';

const AboutSection = ({ userData, limit }) => {
  const experiences = userData?.linkedin?.experience || [];
  const education = userData?.linkedin?.education || [];
  const rawCertifications = userData?.linkedin?.certifications || [];
  const certifications = [...rawCertifications].sort((a, b) => (parseInt(b.date) || 0) - (parseInt(a.date) || 0));
  
  const [activeCert, setActiveCert] = useState(null);
  
  // High-End Technologies Mock Data mapping to categories and custom SVG logos
  const techStack = [
    {
      name: "React.js",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#00f0ff" strokeWidth="1.5">
          <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(0 12 12)" />
          <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60 12 12)" />
          <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="#00f0ff" />
        </svg>
      )
    },
    {
      name: "Tailwind CSS",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#38bdf8" strokeWidth="1.5">
          <path d="M12 6.094C9.11 3.516 5.56 3.516 3.5 6.094c-2.43 3.047-2.01 7.234 1.5 9.047 3.51 1.813 6.99.308 9-2.094 2.89 2.578 6.44 2.578 8.5 0 2.43-3.047 2.01-7.234-1.5-9.047-3.51-1.813-6.99-.308-9 2.094Z" />
        </svg>
      )
    },
    {
      name: "JavaScript",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#facc15" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M10 15a2 2 0 0 1-2-2v-1M14 11.5v.75a1.5 1.5 0 0 0 1.5 1.5h.5a1.5 1.5 0 0 1 1.5 1.5v.75A1.5 1.5 0 0 1 16 17" />
        </svg>
      )
    },
    {
      name: "HTML",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#ea580c" strokeWidth="1.5">
          <path d="M4 2l1.5 17L12 22l6.5-3L20 2H4z" />
          <path d="M12 5H7.5l.5 5h4v2H9.5l-.2-2H7l.3 5.5L12 18.5" />
          <path d="M12 5h4.5l-.5 5H12v2h2.5l-.3 3.5L12 18.5" />
        </svg>
      )
    },
    {
      name: "CSS",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#2563eb" strokeWidth="1.5">
          <path d="M4 2l1.5 17L12 22l6.5-3L20 2H4z" />
          <path d="M12 5.5H8l.5 5h3.5" />
          <path d="M12 12.5H9.5l-.2-2H7.2l.4 5.5L12 18.5" />
          <path d="M12 5.5h4l-.5 5H12" />
          <path d="M12 12.5h2.5l-.3 3.5L12 18.5" />
        </svg>
      )
    },
    {
      name: "Node.js",
      category: "Backend",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#22c55e" strokeWidth="1.5">
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
          <path d="M12 2v20M4 7l8 5 8-5" />
        </svg>
      )
    },
    {
      name: "Express.js",
      category: "Backend",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M7 9h4M7 12h3M7 15h4M14 9l3 6M17 9l-3 6" />
        </svg>
      )
    },
    {
      name: "Python",
      category: "Backend",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#818cf8" strokeWidth="1.5">
          <path d="M12 2C6.5 2 6.5 4.5 6.5 4.5V7.5H12V8.25H4.25C4.25 8.25 2 8.25 2 13.75C2 19.25 4.25 19.25 4.25 19.25H6.5V16.5C6.5 16.5 6.5 13.5 9.5 13.5H15.5C15.5 13.5 17.5 13.5 17.5 11.25V5.75C17.5 5.75 17.5 2 12 2Z" />
          <path d="M12 22C17.5 22 17.5 19.5 17.5 19.5V16.5H12V15.75H19.75C19.75 15.75 22 15.75 22 10.25C22 4.75 19.75 4.75 19.75 4.75H17.5V7.5C17.5 7.5 17.5 10.5 14.5 10.5H8.5C8.5 10.5 6.5 10.5 6.5 12.75V18.25C6.5 18.25 6.5 22 12 22Z" />
        </svg>
      )
    },
    {
      name: "TensorFlow",
      category: "Data Science & AI",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#f97316" strokeWidth="1.5">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
          <path d="M12 6v12M7 9h10" />
        </svg>
      )
    },
    {
      name: "PyTorch",
      category: "Data Science & AI",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#ee4c2c" strokeWidth="1.5">
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
          <path d="M12 7l4 8H8l4-8z" />
        </svg>
      )
    },
    {
      name: "SQL",
      category: "Database",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      )
    },
    {
      name: "MongoDB",
      category: "Database",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#10b981" strokeWidth="1.5">
          <path d="M12 2c0 0-5 4-5 9s3 6 5 11c2-5 5-7 5-11s-5-9-5-9z" />
          <path d="M12 2v20" />
        </svg>
      )
    },
    {
      name: "Firebase",
      category: "Database",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#FFCA28">
          <path d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z" />
        </svg>
      )
    },
    {
      name: "SQLite",
      category: "Database",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#003B57">
          <path d="M21.678.521c-1.032-.92-2.28-.55-3.513.544a8.71 8.71 0 0 0-.547.535c-2.109 2.237-4.066 6.38-4.674 9.544.237.48.422 1.093.544 1.561a13.044 13.044 0 0 1 .164.703s-.019-.071-.096-.296l-.05-.146a1.689 1.689 0 0 0-.033-.08c-.138-.32-.518-.995-.686-1.289-.143.423-.27.818-.376 1.176.484.884.778 2.4.778 2.4s-.025-.099-.147-.442c-.107-.303-.644-1.244-.772-1.464-.217.804-.304 1.346-.226 1.478.152.256.296.698.422 1.186.286 1.1.485 2.44.485 2.44l.017.224a22.41 22.41 0 0 0 .056 2.748c.095 1.146.273 2.13.5 2.657l.155-.084c-.334-1.038-.47-2.399-.41-3.967.09-2.398.642-5.29 1.661-8.304 1.723-4.55 4.113-8.201 6.3-9.945-1.993 1.8-4.692 7.63-5.5 9.788-.904 2.416-1.545 4.684-1.931 6.857.666-2.037 2.821-2.912 2.821-2.912s1.057-1.304 2.292-3.166c-.74.169-1.955.458-2.362.629-.6.251-.762.337-.762.337s1.945-1.184 3.613-1.72C21.695 7.9 24.195 2.767 21.678.521m-18.573.543A1.842 1.842 0 0 0 1.27 2.9v16.608a1.84 1.84 0 0 0 1.835 1.834h9.418a22.953 22.953 0 0 1-.052-2.707c-.006-.062-.011-.141-.016-.2a27.01 27.01 0 0 0-.473-2.378c-.121-.47-.275-.898-.369-1.057-.116-.197-.098-.31-.097-.432 0-.12.015-.245.037-.386a9.98 9.98 0 0 1 .234-1.045l.217-.028c-.017-.035-.014-.065-.031-.097l-.041-.381a32.8 32.8 0 0 1 .382-1.194l.2-.019c-.008-.016-.01-.038-.018-.053l-.043-.316c.63-3.28 2.587-7.443 4.8-9.791.066-.069.133-.128.198-.194Z" />
        </svg>
      )
    },
    {
      name: "Supabase",
      category: "Database",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#3ECF8E">
          <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" />
        </svg>
      )
    },
    {
      name: "TypeScript",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#3178C6">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
        </svg>
      )
    },
    {
      name: "Dart",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#0175C2">
          <path d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263L4.784 4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643-.302-.267-.567-.468-1.07-.462-.37.014-.87.195-.87.195L6.341 4.105l10.498.001z" />
        </svg>
      )
    },
    {
      name: "Swift",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#F05138">
          <path d="M7.508 0c-.287 0-.573 0-.86.002-.241.002-.483.003-.724.01-.132.003-.263.009-.395.015A9.154 9.154 0 0 0 4.348.15 5.492 5.492 0 0 0 2.85.645 5.04 5.04 0 0 0 .645 2.848c-.245.48-.4.972-.495 1.5-.093.52-.122 1.05-.136 1.576a35.2 35.2 0 0 0-.012.724C0 6.935 0 7.221 0 7.508v8.984c0 .287 0 .575.002.862.002.24.005.481.012.722.014.526.043 1.057.136 1.576.095.528.25 1.02.495 1.5a5.03 5.03 0 0 0 2.205 2.203c.48.244.97.4 1.498.495.52.093 1.05.124 1.576.138.241.007.483.009.724.01.287.002.573.002.86.002h8.984c.287 0 .573 0 .86-.002.241-.001.483-.003.724-.01a10.523 10.523 0 0 0 1.578-.138 5.322 5.322 0 0 0 1.498-.495 5.035 5.035 0 0 0 2.203-2.203c.245-.48.4-.972.495-1.5.093-.52.124-1.05.138-1.576.007-.241.009-.481.01-.722.002-.287.002-.575.002-.862V7.508c0-.287 0-.573-.002-.86a33.662 33.662 0 0 0-.01-.724 10.5 10.5 0 0 0-.138-1.576 5.328 5.328 0 0 0-.495-1.5A5.039 5.039 0 0 0 21.152.645 5.32 5.32 0 0 0 19.654.15a10.493 10.493 0 0 0-1.578-.138 34.98 34.98 0 0 0-.722-.01C17.067 0 16.779 0 16.492 0H7.508zm6.035 3.41c4.114 2.47 6.545 7.162 5.549 11.131-.024.093-.05.181-.076.272l.002.001c2.062 2.538 1.5 5.258 1.236 4.745-1.072-2.086-3.066-1.568-4.088-1.043a6.803 6.803 0 0 1-.281.158l-.02.012-.002.002c-2.115 1.123-4.957 1.205-7.812-.022a12.568 12.568 0 0 1-5.64-4.838c.649.48 1.35.902 2.097 1.252 3.019 1.414 6.051 1.311 8.197-.002C9.651 12.73 7.101 9.67 5.146 7.191a10.628 10.628 0 0 1-1.005-1.384c2.34 2.142 6.038 4.83 7.365 5.576C8.69 8.408 6.208 4.743 6.324 4.86c4.436 4.47 8.528 6.996 8.528 6.996.154.085.27.154.36.213.085-.215.16-.437.224-.668.708-2.588-.09-5.548-1.893-7.992z" />
        </svg>
      )
    },
    {
      name: "C++",
      category: "Backend",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#00599C">
          <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 0 1 6.156 3.553l-3.076 1.78a3.567 3.567 0 0 0-3.08-1.78A3.56 3.56 0 0 0 8.444 12 3.56 3.56 0 0 0 12 15.555a3.57 3.57 0 0 0 3.08-1.778l3.078 1.78A7.135 7.135 0 0 1 12 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z" />
        </svg>
      )
    },
    {
      name: "C",
      category: "Backend",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#A8B9CC">
          <path d="M16.5921 9.1962s-.354-3.298-3.627-3.39c-3.2741-.09-4.9552 2.474-4.9552 6.14 0 3.6651 1.858 6.5972 5.0451 6.5972 3.184 0 3.5381-3.665 3.5381-3.665l6.1041.365s.36 3.31-2.196 5.836c-2.552 2.5241-5.6901 2.9371-7.8762 2.9201-2.19-.017-5.2261.034-8.1602-2.97-2.938-3.0101-3.436-5.9302-3.436-8.8002 0-2.8701.556-6.6702 4.047-9.5502C7.444.72 9.849 0 12.254 0c10.0422 0 10.7172 9.2602 10.7172 9.2602z" />
        </svg>
      )
    },
    {
      name: "Jupyter Notebook",
      category: "Data Science & AI",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#F37626">
          <path d="M7.157 22.201A1.784 1.799 0 0 1 5.374 24a1.784 1.799 0 0 1-1.784-1.799 1.784 1.799 0 0 1 1.784-1.799 1.784 1.799 0 0 1 1.783 1.799zM20.582 1.427a1.415 1.427 0 0 1-1.415 1.428 1.415 1.427 0 0 1-1.416-1.428A1.415 1.427 0 0 1 19.167 0a1.415 1.427 0 0 1 1.415 1.427zM4.992 3.336A1.047 1.056 0 0 1 3.946 4.39a1.047 1.056 0 0 1-1.047-1.055A1.047 1.056 0 0 1 3.946 2.28a1.047 1.056 0 0 1 1.046 1.056zm7.336 1.517c3.769 0 7.06 1.38 8.768 3.424a9.363 9.363 0 0 0-3.393-4.547 9.238 9.238 0 0 0-5.377-1.728A9.238 9.238 0 0 0 6.95 3.73a9.363 9.363 0 0 0-3.394 4.547c1.713-2.04 5.004-3.424 8.772-3.424zm.001 13.295c-3.768 0-7.06-1.381-8.768-3.425a9.363 9.363 0 0 0 3.394 4.547A9.238 9.238 0 0 0 12.33 21a9.238 9.238 0 0 0 5.377-1.729 9.363 9.363 0 0 0 3.393-4.547c-1.712 2.044-5.003 3.425-8.772 3.425Z" />
        </svg>
      )
    },
    {
      name: "Git",
      category: "Tools",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#f1502f" strokeWidth="1.5">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6M9 15h6" />
          <path d="M18 15v-3c0-3-3-3-3-3H9" />
        </svg>
      )
    },
    {
      name: "Linux",
      category: "Tools",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
          <path d="M12 2c-3.5 0-6.5 2.5-6.5 6 0 2.5 1 3.5 1 5.5-.5.5-2 1.5-2 3s1.5 2.5 3 2.5h9c1.5 0 3-1 3-2.5s-1.5-2.5-2-3c0-2 1-3 1-5.5 0-3.5-3-6-6.5-6z" />
        </svg>
      )
    },
    {
      name: "REST API",
      category: "Tools",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#06b6d4" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3" />
          <circle cx="19" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="5" cy="5" r="2" />
          <circle cx="19" cy="19" r="2" />
          <path d="M17 7l-3.5 3.5M7 17l3.5-3.5M7 7l3.5 3.5M17 17l-3.5-3.5" />
        </svg>
      )
    },
    {
      name: "PowerShell",
      category: "Tools",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#5391FE">
          <path d="M23.181 2.974c.568 0 .923.463.792 1.035l-3.659 15.982c-.13.572-.697 1.035-1.265 1.035H.819c-.568 0-.923-.463-.792-1.035L3.686 4.009c.13-.572.697-1.035 1.265-1.035zm-8.375 9.346c.251-.394.227-.905-.09-1.243L9.122 5.125c-.38-.404-1.037-.407-1.466-.003-.429.402-.468 1.056-.088 1.46 l4.662 4.96v.11l-7.42 5.374c-.45.327-.533.977-.187 1.453.346.476.991.597 1.44.27l8.229-5.91c.28-.196.438-.365.514-.52zm-2.796 4.399a.928.928 0 00-.934.923c0 .51.418.923.934.923h4.433a.928.928 0 00.934-.923.928.928 0 00-.934-.923z" />
        </svg>
      )
    },
    {
      name: "Batchfile",
      category: "Tools",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#4EAA25">
          <path d="M21.038,4.9l-7.577-4.498C13.009,0.134,12.505,0,12,0c-0.505,0-1.009,0.134-1.462,0.403L2.961,4.9 C2.057,5.437,1.5,6.429,1.5,7.503v8.995c0,1.073,0.557,2.066,1.462,2.603l7.577,4.497C10.991,23.866,11.495,24,12,24 c0.505,0,1.009-0.134,1.461-0.402l7.577-4.497c0.904-0.537,1.462-1.529,1.462-2.603V7.503C22.5,6.429,21.943,5.437,21.038,4.9z M15.17,18.946l0.013,0.646c0.001,0.078-0.05,0.167-0.111,0.198l-0.383,0.22c-0.061,0.031-0.111-0.007-0.112-0.085L14.57,19.29 c-0.328,0.136-0.66,0.169-0.872,0.084c-0.04-0.016-0.057-0.075-0.041-0.142l0.139-0.584c0.011-0.046,0.036-0.092,0.069-0.121 c0.012-0.011,0.024-0.02,0.036-0.026c0.022-0.011,0.043-0.014,0.062-0.006c0.229,0.077,0.521,0.041,0.802-0.101 c0.357-0.181,0.596-0.545,0.592-0.907c-0.003-0.328-0.181-0.465-0.613-0.468c-0.55,0.001-1.064-0.107-1.072-0.917 c-0.007-0.667,0.34-1.361,0.889-1.8l-0.007-0.652c-0.001-0.08,0.048-0.168,0.111-0.2l0.37-0.236 c0.061-0.031,0.111,0.007,0.112,0.087l0.006,0.653c0.273-0.109,0.511-0.138,0.726-0.088c0.047,0.012,0.067,0.076,0.048,0.151 l-0.144,0.578c-0.011,0.044-0.036,0.088-0.065,0.116c-0.012,0.012-0.025,0.021-0.038,0.028c-0.019,0.01-0.038,0.013-0.057,0.009 c-0.098-0.022-0.332-0.073-0.699,0.113c-0.385,0.195-0.52,0.53-0.517,0.778c0.003,0.297,0.155,0.387,0.681,0.396 c0.7,0.012,1.003,0.318,1.01,1.023C16.105,17.747,15.736,18.491,15.17,18.946z M19.143,17.859c0,0.06-0.008,0.116-0.058,0.145 l-1.916,1.164c-0.05,0.029-0.09,0.004-0.09-0.056v-0.494c0-0.06,0.037-0.093,0.087-0.122l1.887-1.129 c0.05-0.029,0.09-0.004,0.09,0.056V17.859z M20.459,6.797l-7.168,4.427c-0.894,0.523-1.553,1.109-1.553,2.187v8.833 c0,0.645,0.26,1.063,0.66,1.184c-0.131,0.023-0.264,0.039-0.398,0.039c-0.42,0-0.833-0.114-1.197-0.33L3.226,18.64 c-0.741-0.44-1.201-1.261-1.201-2.142V7.503c0-0.881,0.46-1.702,1.201-2.142l7.577-4.498c0.363-0.216,0.777-0.33,1.197-0.33 c0.419,0,0.833,0.114,1.197,0.33l7.577,4.498c0.624,0.371,1.046,1.013,1.164,1.732C21.686,6.557,21.12,6.411,20.459,6.797z" />
        </svg>
      )
    },
    {
      name: "Dockerfile",
      category: "Tools",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#2496ED">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
        </svg>
      )
    },
    {
      name: "CMake",
      category: "Tools",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="#06C2AC">
          <path d="M11.769.066L.067 23.206l12.76-10.843zM23.207 23.934L7.471 17.587 0 23.934zM24 23.736L12.298.463l1.719 19.24zM12.893 12.959l-5.025 4.298 5.62 2.248z" />
        </svg>
      )
    }
  ];

  // Dynamic Language Aggregation from GitHub repositories
  const githubRepos = userData?.github?.repositories || [];
  const dynamicLanguages = new Map();
  githubRepos.forEach(repo => {
    if (repo.languages) {
      Object.keys(repo.languages).forEach(lang => {
        if (lang.toLowerCase() !== 'other') {
          dynamicLanguages.set(lang, repo.category);
        }
      });
    }
  });

  const getLanguageCategory = (lang, repoCategory) => {
    const l = lang.toLowerCase();
    if (l === 'typescript' || l === 'dart' || l === 'swift') {
      return "Frontend / Web";
    }
    if (l === 'python' || l === 'c++' || l === 'c' || l === 'javascript' || l === 'go' || l === 'rust') {
      return "Backend";
    }
    if (l === 'jupyter notebook') {
      return "Data Science & AI";
    }
    if (l === 'powershell' || l === 'batchfile' || l === 'dockerfile' || l === 'cmake' || l === 'makefile') {
      return "Tools";
    }
    if (repoCategory === "Data Science") return "Data Science & AI";
    if (repoCategory === "Mobile Apps" || repoCategory === "Web Apps") return "Frontend / Web";
    return "Tools";
  };

  const staticTechNames = new Set(techStack.map(t => t.name.toLowerCase()));
  const dynamicTechItems = [];
  dynamicLanguages.forEach((repoCategory, lang) => {
    if (!staticTechNames.has(lang.toLowerCase())) {
      dynamicTechItems.push({
        name: lang,
        category: getLanguageCategory(lang, repoCategory),
        icon: (
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#00f0ff" strokeWidth={1.5}>
            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 4l-4 16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      });
    }
  });

  const fullTechStack = [...techStack, ...dynamicTechItems];

  // Filtering Logic
  const categories = ["All", "Frontend / Web", "Backend", "Database", "Data Science & AI", "Tools"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTech = activeCategory === "All"
    ? fullTechStack
    : fullTechStack.filter(item => item.category === activeCategory);

  const columnVariantsLeft = {
    hidden: { opacity: 0, x: -20, scale: 0.99 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const columnVariantsRight = {
    hidden: { opacity: 0, x: 20, scale: 0.99 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // If in summary mode (like on homepage), AboutMe isn't shown because AboutHero handles it.
  if (limit) return null;

  const learningJourney = [
    {
      period: "2023 - PRESENT",
      title: "Data Science Specialization",
      institution: "Gujarat Technological University",
      description: "Building mathematical foundations in statistical modeling, algorithms, and predictive systems. Specializing in bridging academic data architectures with practical production systems."
    },
    {
      period: "2024",
      title: "Neural Networks & Deep Learning",
      institution: "Autodidact & Specializations",
      description: "Diving into regression analysis, deep classifiers, LightGBM, and computer vision models. Mastering PyTorch and TensorFlow pipelines to build robust machine learning pipelines."
    },
    {
      period: "2024 - 2025",
      title: "Full-Stack Product Engineering",
      institution: "SaaS & AI Infrastructure",
      description: "Engineering secure databases, responsive frontend layers, and microservices. Linking machine learning endpoints with consumer interfaces like Lawyer.AI and CONCEPTLENS."
    }
  ];

  return (
    <section id="about" style={{ padding: '120px 0', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-dark-950)' }}>
      <div className="container">
        
        {/* Storytelling Trajectory Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'start',
          marginBottom: '80px'
        }}>
          {/* Left Column: Biography & Visual Journey */}
          <motion.div
            variants={columnVariantsLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
          >
            <div>
              <span className="section-tag">Biography</span>
              <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 38px)', lineHeight: '1.1', marginBottom: '20px' }}>
                The Trajectory
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.65', marginBottom: '16px', fontWeight: '300' }}>
                Currently pursuing a Bachelor of Engineering in Computer Science and Engineering, specializing in Data Science at GTU.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.65', fontWeight: '300' }}>
                My work exists at the intersection of engineering systems and statistical learning, with a secondary channel dedicated to philosophical sci-fi writing.
              </p>
            </div>

            {/* Visual Learning Journey Timeline */}
            <div>
              <h4 className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '32px' }}>
                Learning Path & Milestones
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative' }}>
                {/* Vertical continuous timeline bar */}
                <div style={{
                  position: 'absolute',
                  left: '6px',
                  top: '12px',
                  bottom: '12px',
                  width: '1px',
                  background: 'var(--border-strong)'
                }} />

                {learningJourney.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    style={{
                      display: 'flex',
                      gap: '24px',
                      paddingBottom: idx === learningJourney.length - 1 ? '0' : '36px',
                      position: 'relative'
                    }}
                  >
                    {/* Timeline dot */}
                    <div style={{
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      background: 'var(--bg-dark-950)',
                      border: '2px solid var(--text-muted)',
                      zIndex: 2,
                      marginTop: '4px',
                      flexShrink: 0
                    }}
                    className="timeline-node"
                    />

                    {/* Timeline content */}
                    <div>
                      <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        {item.period}
                      </span>
                      <h4 style={{ fontSize: '14.5px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '2px' }}>
                        {item.title}
                      </h4>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontFamily: 'JetBrains Mono, monospace' }}>
                        {item.institution}
                      </span>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', fontWeight: '300' }}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Experience & Credentials */}
          <motion.div
            variants={columnVariantsRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
          >
            <div>
              <span className="section-tag">Professional Journey</span>
              <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 38px)', lineHeight: '1.1', marginBottom: '20px' }}>
                Growth & Milestones
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.65', marginBottom: '32px', fontWeight: '300' }}>
                A timeline of formal systems training and industry internship positions.
              </p>

              {/* Unified Experience & Education Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative' }}>
                {/* Vertical continuous timeline bar */}
                <div style={{
                  position: 'absolute',
                  left: '6px',
                  top: '12px',
                  bottom: '12px',
                  width: '1px',
                  background: 'var(--border-strong)'
                }} />

                {/* Growth Milestone 1: GTU */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  style={{ display: 'flex', gap: '24px', paddingBottom: '36px', position: 'relative' }}
                >
                  <div style={{
                    width: '13px',
                    height: '13px',
                    borderRadius: '50%',
                    background: 'var(--bg-dark-950)',
                    border: '2px solid var(--text-primary)',
                    zIndex: 2,
                    marginTop: '4px',
                    flexShrink: 0
                  }} />
                  <div>
                    <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      JUL 2025 - PRESENT
                    </span>
                    <h4 style={{ fontSize: '14.5px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '2px' }}>
                      B.E. in Computer Science & Engineering (Data Science)
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontFamily: 'JetBrains Mono, monospace' }}>
                      Gujarat Technological University (GTU)
                    </span>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', fontWeight: '300' }}>
                      Pursuing specialization in predictive analytics, large-scale computational systems, and data structures.
                    </p>
                  </div>
                </motion.div>

                {/* Growth Milestone 2: Aarogix */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ display: 'flex', gap: '24px', paddingBottom: '36px', position: 'relative' }}
                >
                  <div style={{
                    width: '13px',
                    height: '13px',
                    borderRadius: '50%',
                    background: 'var(--bg-dark-950)',
                    border: '2px solid var(--text-muted)',
                    zIndex: 2,
                    marginTop: '4px',
                    flexShrink: 0
                  }}
                  className="timeline-node"
                  />
                  <div>
                    <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      MAY 2025 - JUN 2025
                    </span>
                    <h4 style={{ fontSize: '14.5px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '2px' }}>
                      Summer Intern
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontFamily: 'JetBrains Mono, monospace' }}>
                      Aarogix
                    </span>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', fontWeight: '300' }}>
                      Conducted quantitative data analysis and structured data validation logs, improving formatting and data entry accuracy rates.
                    </p>
                  </div>
                </motion.div>

                {/* Growth Milestone 3: LJ University */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ display: 'flex', gap: '24px', position: 'relative' }}
                >
                  <div style={{
                    width: '13px',
                    height: '13px',
                    borderRadius: '50%',
                    background: 'var(--bg-dark-950)',
                    border: '2px solid var(--text-muted)',
                    zIndex: 2,
                    marginTop: '4px',
                    flexShrink: 0
                  }}
                  className="timeline-node"
                  />
                  <div>
                    <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      AUG 2022 - MAY 2025
                    </span>
                    <h4 style={{ fontSize: '14.5px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '2px' }}>
                      Diploma in Computer Engineering
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontFamily: 'JetBrains Mono, monospace' }}>
                      LJ University
                    </span>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', fontWeight: '300' }}>
                      Graduated with First Class with Distinction. Focused on systems programming, databases, web technologies, and software development lifecycles.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Separator Subtle Line */}
        <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '60px 0' }} />

        {/* Technologies Grid Section */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-tag">Technology Stack</span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 42px)', lineHeight: '1.1', marginBottom: '12px' }}>
              Technologies & Languages
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', maxWidth: '500px', margin: '0 auto', fontWeight: '300' }}>
              Core languages, libraries, and frameworks utilized across systems and pipelines.
            </p>
          </div>

          {/* Interactive Categories Split Dashboard */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'start'
          }}>
            {/* Category Selectors Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px', display: 'block' }}>
                Filter by Domain
              </span>
              {categories.map((cat) => {
                const count = cat === "All" 
                  ? fullTechStack.length 
                  : fullTechStack.filter(item => item.category === cat).length;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`domain-filter-btn ${isActive ? 'active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 20px',
                      borderRadius: '4px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{cat.toUpperCase()}</span>
                    <span style={{ fontSize: '9px', opacity: 0.6 }}>[{count}]</span>
                  </button>
                );
              })}
            </div>

            {/* Dotted Connections Skill list */}
            <motion.div
              layout
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '24px',
                borderRadius: '8px',
                background: 'var(--bg-dark-900)',
                border: '1px solid var(--border-subtle)',
                minHeight: '340px'
              }}
            >
              <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', display: 'block' }}>
                {activeCategory.toUpperCase()} SKILLS
              </span>
              
              <AnimatePresence mode="popLayout">
                {filteredTech.map((tech) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    key={tech.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.8
                      }}>
                        {React.cloneElement(tech.icon, { width: 15, height: 15 })}
                      </div>
                      <span style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: '400' }}>
                        {tech.name}
                      </span>
                    </div>
                    <div style={{ flex: 1, borderBottom: '1px dotted var(--border-strong)', margin: '0 16px', height: '10px', opacity: 0.5 }} />
                    <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {tech.category}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Certifications Section */}
        {certifications.length > 0 && (
          <>
            <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '80px 0' }} />
            <div>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <span className="section-tag">Credentials</span>
                <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: '1.1', marginBottom: '12px' }}>
                  Licenses & Specializations
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '500px', margin: '0 auto' }}>
                  Verified certifications and academic completions.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '24px'
              }}>
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    className="surface-card"
                    onClick={() => setActiveCert(cert)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      padding: '24px',
                      justifyContent: 'space-between',
                      minHeight: '180px',
                      cursor: 'pointer'
                    }}
                    whileHover={{ y: -6, borderColor: 'rgba(0, 240, 255, 0.25)' }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                        <div style={{
                          padding: '8px',
                          borderRadius: '8px',
                          background: 'rgba(0, 240, 255, 0.05)',
                          border: '1px solid rgba(0, 240, 255, 0.1)',
                          color: '#00f0ff'
                        }}>
                          <Award size={18} />
                        </div>
                        {cert.link && cert.link !== '#' && (
                          <a href={cert.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <h4 className="font-heading" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
                        {cert.name}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
                        {cert.issuer}
                      </p>
                      <span className="font-mono" style={{ fontSize: '9px', color: '#00f0ff', opacity: 0.8, marginTop: '12px', display: 'block' }}>
                        &gt; Click to view details
                      </span>
                    </div>
                    <div className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {cert.date}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* Certifications Modal Overlay */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 5, 5, 0.95)',
              backdropFilter: 'blur(12px)',
              zIndex: 1100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              data-lenis-prevent
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                maxWidth: '640px',
                background: '#0E0E12',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                overflow: 'hidden',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCert(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-primary)',
                  padding: '8px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={16} />
              </button>

              {/* Certificate Image Area */}
              <div style={{
                height: activeCert.image && activeCert.image.toLowerCase().endsWith('.pdf') ? '450px' : '280px',
                background: '#07070a',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: activeCert.image && activeCert.image.toLowerCase().endsWith('.pdf') ? '0' : '20px'
              }}>
                {activeCert.image ? (
                  activeCert.image.toLowerCase().endsWith('.pdf') ? (
                    <iframe
                      src={`/images/certificates/${activeCert.image}`}
                      title={activeCert.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none'
                      }}
                    />
                  ) : (
                    <img
                      src={`/images/certificates/${activeCert.image}`}
                      alt={activeCert.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: '4px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                      }}
                    />
                  )
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    background: 'linear-gradient(135deg, #0A0A0D 0%, #15151F 100%)',
                    borderRadius: '8px'
                  }}>
                    <Award size={36} style={{ color: 'rgba(0, 240, 255, 0.15)' }} />
                    <span className="font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.12)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                      [ Certificate Image Pending ]
                    </span>
                  </div>
                )}
              </div>

              {/* Certificate Info Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <span className="font-mono" style={{ fontSize: '10px', color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>
                    {activeCert.issuer}
                  </span>
                  <h3 className="font-heading" style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
                    {activeCert.name}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    {activeCert.description || "No description provided."}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px' }}>
                  <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    COMPLETED: {activeCert.date}
                  </span>

                  {activeCert.link && activeCert.link !== '#' && (
                    <a
                      href={activeCert.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        background: '#00f0ff',
                        color: '#050505',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: '700',
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      Verify Credentials <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive adjustments for tech grid and filters */}
      <style>{`
        @media (max-width: 540px) {
          .tech-stack-grid {
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)) !important;
            gap: 12px !important;
          }
        }
      `}</style>

    </section>
  );
};

export default AboutSection;
