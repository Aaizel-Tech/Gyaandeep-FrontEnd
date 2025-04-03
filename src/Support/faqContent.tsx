import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const FAQContent: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState("PLOT VIEW");
  const navigate = useNavigate();

  const faqData: FAQSection[] = [
    {
      title: "PLOT VIEW",
      items: [
        {
          question: "What information is displayed in the measurement charts?",
          answer:
            "The Plot View includes four main measurement charts:\n\n1. Pressure vs Altitude: Shows atmospheric pressure changes with altitude in hPa\n2. Temperature vs Altitude: Displays temperature variations with height in °C\n3. Humidity vs Altitude: Shows relative humidity changes with altitude in %\n4. Wind Speed vs Altitude: Displays wind speed variations with height in km/hr\n\nEach chart provides real-time data visualization with interactive tooltips and proper axis labeling.",
        },
        {
          question: "How do I interpret the Signal Strength (DBM) chart?",
          answer:
            "The Signal Strength chart shows the Received Signal Strength Indicator (RSSI) measured in dBm over distance (km). A higher (less negative) dBm value indicates a stronger signal. The chart helps monitor:\n\n- Signal quality over distance\n- Connection stability\n- Potential interference or signal degradation\n- Maximum effective range of communication",
        },
        {
          question: "What do the gauge displays indicate?",
          answer:
            "The dashboard features five real-time gauge displays:\n\n1. Pressure: Atmospheric pressure in hPa (hectopascals)\n2. Temperature: Ambient temperature in °C\n3. Humidity: Relative humidity percentage\n4. Windspeed: Current wind speed in m/s\n5. Altitude: Current altitude in meters\n\nEach gauge updates automatically and includes both a visual indicator and numerical value.",
        },
      ],
    },

    {
      title: "ANALYTICS",
      items: [
        {
          question: "How do I use the date range selector?",
          answer:
            "The date range selector at the top of the page allows you to specify a time period for your data analysis. Select a 'From' date and a 'To' date, then click the 'Fetch Data' button to update all charts and tables with data from the selected period.",
        },
        {
          question: "What information does the Ascent Summary provide?",
          answer:
            "The Ascent Summary tab shows a detailed table of atmospheric measurements at different altitudes. It includes data such as pressure, temperature, humidity, wind speed and direction, and various derived parameters like dew point and geopotential height.",
        },
        {
          question: "What does the Profile Data diagram show?",
          answer:
            "The Profile Data diagram displays the vertical profile of temperature, pressure, and humidity. It helps visualize how these parameters change with altitude, which is crucial for understanding atmospheric stability and potential weather phenomena.",
        },
        {
          question: "How do I interpret the Altitude diagram?",
          answer:
            "The Altitude diagram is a pie chart showing the distribution of measurements across different altitude ranges. It gives a quick overview of the vertical coverage of your data set.",
        },
        {
          question: "What is the Balloon Track chart?",
          answer:
            "The Balloon Track chart is a radar chart that provides an overview of key atmospheric parameters such as temperature, pressure, humidity, wind speed, and altitude. It allows for quick comparison of these parameters in a single view.",
        },
        {
          question: "How do I read the Skew-T diagram?",
          answer:
            "The Skew-T diagram is a standard meteorological chart that plots temperature and dew point against pressure (altitude). The temperature axis is skewed, hence the name. It's used to analyze atmospheric stability and predict weather phenomena like thunderstorms.",
        },
        {
          question: "What is a Tephigram and how is it used?",
          answer:
            "A Tephigram is another type of thermodynamic diagram used in weather analysis. It plots temperature against entropy, which helps in assessing the stability of the atmosphere and the energy available for convection.",
        },
        {
          question: "What does LFC stand for and what does it show?",
          answer:
            "LFC stands for Level of Free Convection. The LFC chart shows the height at which a parcel of air, if heated from below, will become warmer than the surrounding air and continue to rise on its own. This is important for predicting the potential for thunderstorm development.",
        },
        {
          question: "What is CCL and how is it used in meteorology?",
          answer:
            "CCL stands for Convective Condensation Level. The CCL chart shows the height at which a parcel of air, if heated from below, will reach its dew point temperature and form a cloud. This is useful for predicting cloud formation and potential precipitation.",
        },
        {
          question: "Can I export the data or charts from this application?",
          answer:
            "Currently, the application doesn't have a built-in export feature. However, you can use your browser's screenshot functionality or a screen capture tool to save images of the charts. For data export, please contact the system administrator.",
        },
        {
          question: "How often is the data updated?",
          answer:
            "The frequency of data updates depends on the configuration of the radiosonde system and data processing pipeline. Typically, new data is available after each balloon launch, which can be once or twice daily. Check with your local meteorological office for specific update schedules.",
        },
        {
          question:
            "What should I do if I encounter an error or if the data doesn't look correct?",
          answer:
            "If you encounter any errors or suspect issues with the data, please first try refreshing the page. If the problem persists, note down the specific tab or chart where you see the issue, the date range you're viewing, and any error messages you see. Then, contact our technical support team with these details.",
        },
      ],
    },

    {
      title: "TABULAR VIEW",
      items: [
        {
          question: "What information is displayed in the Tabular View?",
          answer:
            "The Tabular View provides a structured representation of data, such as weather updates, forecasts, or other related metrics.",
        },
        {
          question: "How often is the data updated on this page?",
          answer:
            "The data is updated every [insert time interval] or when new information is fetched from the server.",
        },
        {
          question:
            "Is there a way to download the data displayed on the page?",
          answer:
            "Yes, you can download the data by clicking on the {Export to file} checkbox located on the bottom of the page, and select the relevant file format.",
        },
        {
          question: "Can I filter or sort the data in the Tabular View?",
          answer:
            "Yes, you can use the filter and sort options available at the top of the table to customize the view.",
        },
        {
          question: "How can I view historical data in the Tabular View?",
          answer:
            "Use the date range picker or filter options to load and view historical data.",
        },
      ],
    },
    {
      title: "MET MESSAGE",
      items: [
        {
          question: "What file format can be downloaded?",
          answer:
            "The data can be downloaded in three file formats: excel, csv and word",
        },
        {
          question: "What is the purpose of the MET Message page?",
          answer:
            "This page is designed to display meteorological messages and related information in an organized format.",
        },
      ],
    },
    {
      title: "CALIBRATION",
      items: [
        {
          question: "How to navigate to Calibration Page?",
          answer:
            "On clicking Start Recording Button on Navigation Page, it will redirect to Calibration page",
        },
        {
          question: "Why is the page not displaying updated data?",
          answer:
            "Ensure your connection is stable. If the issue persists, try refreshing the page or clearing your browser cache.",
        },
        {
          question:
            "What happens if no data is available for a specific time period?",
          answer:
            "A message will be displayed indicating that no data is available, and you may adjust the filters or time range to retrieve other results.",
        },
      ],
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const currentSection =
    faqData.find((section) => section.title === activeSection) || faqData[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <span className="text-xl">←</span> Back
          </button>
          <h1 className="text-4xl font-bold">FAQ</h1>
          <div className="w-16"></div>
        </div>
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          {faqData.map((section, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSection(section.title);
                setOpenItems([]);
              }}
              className={`text-sm font-medium transition-colors ${
                section.title === activeSection
                  ? "text-blue-500"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        <div className="space-y-4 bg-white rounded-lg shadow-sm p-6">
          {currentSection.items.map((item, idx) => (
            <div key={idx} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => toggleItem(idx)}
                className="w-full text-left py-4 flex justify-between items-center group"
              >
                <span className="text-sm font-medium">{item.question}</span>
                <span className="text-xl">
                  {openItems.includes(idx) ? "-" : "+"}
                </span>
              </button>

              {openItems.includes(idx) && (
                <div className="pb-4">
                  <p className="text-gray-600 text-sm whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQContent;
