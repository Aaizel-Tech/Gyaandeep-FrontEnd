const ArchitectureOverview = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">
        SAMVAD Integrated Dashboard 2.0 - Architecture Overview
      </h1>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-blue-700">
          Microservices Architecture
        </h2>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="mb-2">
            The dashboard is built using a microservices architecture where each
            functional area is developed as a separate module that can be
            deployed and scaled independently.
          </p>
          <p>
            This architecture allows for greater flexibility, scalability, and
            easier maintenance of the system.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-bold mb-2 text-blue-700">
            Core Frontend Technologies
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>NextJS (React Framework)</li>
            <li>TypeScript</li>
            <li>TailwindCSS</li>
            <li>Recharts/D3.js for Visualizations</li>
            <li>React Query for API Data Fetching</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-bold mb-2 text-blue-700">Backend Integration</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>RESTful API Integration</li>
            <li>WebSocket for Real-time Updates</li>
            <li>Authentication via Keycloak</li>
            <li>OpenSearch for Search Functionality</li>
            <li>Redis for Caching</li>
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-blue-700">Core Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Authentication & User Management",
              desc: "User roles, permissions, and access control",
            },
            {
              name: "Media Monitoring",
              desc: "Track print, electronic, online, and social media",
            },
            {
              name: "Analytics & Reports",
              desc: "Insights, trends, sentiment analysis",
            },
            {
              name: "Alerts & Notifications",
              desc: "Real-time alerts and response management",
            },
            {
              name: "Dashboard & Visualization",
              desc: "Customizable dashboards and data visualization",
            },
            {
              name: "Content Management",
              desc: "Manage multilingual content and translations",
            },
            {
              name: "Workflow Management",
              desc: "Response workflow and approval processes",
            },
            {
              name: "Search & Retrieval",
              desc: "Advanced search across all media types",
            },
            {
              name: "Mobile Integration",
              desc: "Mobile app sync and notifications",
            },
          ].map((module, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border shadow-sm"
            >
              <h3 className="font-bold text-blue-800">{module.name}</h3>
              <p className="text-sm text-gray-700">{module.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border mb-8">
        <h2 className="text-xl font-bold mb-3 text-blue-700">
          Integration Approach
        </h2>
        <p className="mb-2">
          Each module will be built as a standalone component that can be:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Developed and tested independently</li>
          <li>Deployed as a separate service</li>
          <li>Integrated through a unified API gateway</li>
          <li>Connected to shared data stores when needed</li>
          <li>Communicating through well-defined interfaces</li>
        </ul>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h2 className="text-xl font-bold mb-3 text-blue-700">
          Deployment Strategy
        </h2>
        <p>
          The system will be containerized using Docker and orchestrated with
          Kubernetes on NIC Cloud infrastructure, allowing for seamless scaling
          and management of individual modules.
        </p>
      </div>
    </div>
  );
};

export default ArchitectureOverview;
