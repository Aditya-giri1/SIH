import React, { useState } from "react";

// Simple Button component
const Button = ({ variant = "default", size = "md", onClick, children }) => {
  let baseClasses = "rounded-lg font-semibold transition-transform transform focus:outline-none ";
  let variantClasses = variant === "default"
    ? "bg-teal-600 text-white hover:bg-teal-700"
    : "border border-gray-300 text-gray-700 hover:bg-gray-100";
  let sizeClasses = size === "sm"
    ? "px-3 py-1 text-sm"
    : "px-4 py-2";

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Simple Progress component
const Progress = ({ value, className }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className="bg-teal-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

// Simple Card components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-4 border-b pb-2">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-bold text-gray-800">
    {children}
  </h2>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>
    {children}
  </div>
);

// Questions and options
const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you is a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way",
];

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

const OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export default function ScreeningTool() {
  const [active, setActive] = useState("ALL");
  const [phqAnswers, setPhqAnswers] = useState(new Array(PHQ9_QUESTIONS.length).fill(undefined));
  const [gadAnswers, setGadAnswers] = useState(new Array(GAD7_QUESTIONS.length).fill(undefined));

  function setAnswer(q, idx, value) {
    if (q === "PHQ-9") {
      const arr = [...phqAnswers];
      arr[idx] = value;
      setPhqAnswers(arr);
    } else if (q === "GAD-7") {
      const arr = [...gadAnswers];
      arr[idx] = value;
      setGadAnswers(arr);
    }
  }

  function score(arr) {
    if (arr.some((v) => typeof v !== "number")) return null;
    return arr.reduce((a, b) => a + b, 0);
  }

  function interpretPHQ9(total) {
    if (total === null) return "Complete all items to see interpretation.";
    if (total >= 20) return "Severe depression (PHQ-9 score ≥ 20). Refer for urgent clinical assessment.";
    if (total >= 15) return "Moderately severe depression (PHQ-9 score 15–19). Consider referral and follow-up.";
    if (total >= 10) return "Moderate depression (PHQ-9 score 10–14). Offer treatment/monitoring.";
    if (total >= 5) return "Mild depression (PHQ-9 score 5–9). Watchful waiting; low-intensity interventions.";
    return "Minimal or no depression (PHQ-9 score 0–4).";
  }

  function interpretGAD7(total) {
    if (total === null) return "Complete all items to see interpretation.";
    if (total >= 15) return "Severe anxiety (GAD-7 ≥ 15). Consider specialist assessment.";
    if (total >= 10) return "Moderate anxiety (GAD-7 10–14). Consider brief intervention or referral.";
    if (total >= 5) return "Mild anxiety (GAD-7 5–9). Monitor and offer low-intensity support.";
    return "Minimal or no anxiety (GAD-7 0–4).";
  }

  const phqTotal = score(phqAnswers);
  const gadTotal = score(gadAnswers);

  function ResetAll() {
    setPhqAnswers(new Array(PHQ9_QUESTIONS.length).fill(undefined));
    setGadAnswers(new Array(GAD7_QUESTIONS.length).fill(undefined));
  }

  function ProgressIndicator({ answers, total }) {
    const completed = answers.filter((a) => typeof a === "number").length;
    const percent = (completed / total) * 100;
    return (
      <div className="mb-4">
        <p className="text-xs text-gray-600 mb-1">Completed {completed}/{total}</p>
        <Progress value={percent} className="h-2" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-indigo-700">Mental Health Screening</h1>
          <div className="flex gap-2 flex-wrap">
            {["ALL", "PHQ-9", "GAD-7"].map((tab) => (
              <Button
                key={tab}
                variant={active === tab ? "default" : "outline"}
                onClick={() => setActive(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Questionnaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {(active === "ALL" || active === "PHQ-9") && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-indigo-600">PHQ‑9</h3>
                  <ProgressIndicator answers={phqAnswers} total={PHQ9_QUESTIONS.length} />
                  <ol className="space-y-4">
                    {PHQ9_QUESTIONS.map((q, i) => (
                      <li key={i} className="flex flex-col gap-2">
                        <span className="font-medium">{i + 1}. {q}</span>
                        <div className="flex flex-wrap gap-2">
                          {OPTIONS.map((opt) => (
                            <Button
                              key={opt.value}
                              variant={phqAnswers[i] === opt.value ? "default" : "outline"}
                              size="sm"
                              onClick={() => setAnswer("PHQ-9", i, opt.value)}
                            >
                              {opt.label}
                            </Button>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {(active === "ALL" || active === "GAD-7") && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-indigo-600">GAD‑7</h3>
                  <ProgressIndicator answers={gadAnswers} total={GAD7_QUESTIONS.length} />
                  <ol className="space-y-4">
                    {GAD7_QUESTIONS.map((q, i) => (
                      <li key={i} className="flex flex-col gap-2">
                        <span className="font-medium">{i + 1}. {q}</span>
                        <div className="flex flex-wrap gap-2">
                          {OPTIONS.map((opt) => (
                            <Button
                              key={opt.value}
                              variant={gadAnswers[i] === opt.value ? "default" : "outline"}
                              size="sm"
                              onClick={() => setAnswer("GAD-7", i, opt.value)}
                            >
                              {opt.label}
                            </Button>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={ResetAll}>Reset</Button>
                <a href="#results"><Button>Show Results</Button></a>
              </div>
            </CardContent>
          </Card>

          <Card id="results" className="shadow-lg">
            <CardHeader>
              <CardTitle>Results & Interpretation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-indigo-600">PHQ‑9</h3>
                <p className="text-sm">Score: {phqTotal === null ? "— incomplete —" : phqTotal}</p>
                <p className="text-sm text-gray-600">{interpretPHQ9(phqTotal)}</p>
              </div>

              <div>
                <h3 className="font-semibold text-indigo-600">GAD‑7</h3>
                <p className="text-sm">Score: {gadTotal === null ? "— incomplete —" : gadTotal}</p>
                <p className="text-sm text-gray-600">{interpretGAD7(gadTotal)}</p>
              </div>

              <div className="pt-3 border-t">
                <h4 className="font-semibold">Notes</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>These scores are algorithmic calculations of standard instruments and are not a diagnosis.</li>
                  <li>For clinical or research use, follow local governance and consent procedures.</li>
                </ul>
              </div>

              <Button
                variant="default"
                onClick={() => {
                  const rows = ["instrument,question_index,answer"];
                  phqAnswers.forEach((v, i) => rows.push(`PHQ-9,${i + 1},${v ?? ""}`));
                  gadAnswers.forEach((v, i) => rows.push(`GAD-7,${i + 1},${v ?? ""}`));

                  const csv = rows.join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "screening_responses.csv";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Export CSV
              </Button>
            </CardContent>
          </Card>
        </main>

        <footer className="text-xs text-gray-500 text-center">Built with React + Tailwind.</footer>
      </div>
    </div>
  );
}
