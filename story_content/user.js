window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script2 = function()
{
  try {
  var player = GetPlayer();

  // Safely get scenariosPlayed index (forces 0 on start)
  var rawIdx = player.GetVar("scenariosPlayed");
  var currentIndex = parseInt(rawIdx, 10);
  if (isNaN(currentIndex) || currentIndex < 0) {
    currentIndex = 0;
    player.SetVar("scenariosPlayed", 0);
  }

  // Initialize deck if missing or unpopulated
  if (typeof window.gameDeck === "undefined" || !window.gameDeck || window.gameDeck.length === 0) {
    window.gameDeck = [
      // CONTROL
      { text: "I made a few minor edits to your slide deck before sending it to the VP just to ensure it hits executive tone. Take a look when you can.", category: "Control", hint: "MENTOR HINT: Notice how ownership was quietly taken away instead of offering feedback before sending.", headerCorrect: "Spot on.", headerIncorrect: "Miscalibration.", rationaleCorrect: "You correctly identified over-controlling behavior. Disguised as 'helping,' silent rewrites strip ownership and erode confidence.", rationaleIncorrect: "This statement represents Control. Silently fixing work instead of coaching creates dependency." },
      { text: "Please send me a bulleted outline of your daily schedule every morning by 8:30 AM so I can make sure your tasks are prioritized correctly.", category: "Control", hint: "MENTOR HINT: Look for signs of micromanaging routine communication rather than establishing boundaries.", headerCorrect: "Correct.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Right call. Requiring micro-updates on routine schedules is over-control and signals a lack of trust.", rationaleIncorrect: "This statement represents Control. Tracking hourly tasks is operational micromanagement." },
      { text: "I drafted the email response to the client for you. Just copy and paste it from your inbox and send it out under your name.", category: "Control", hint: "MENTOR HINT: The leader steps in to perform the task themselves rather than preparing the team member.", headerCorrect: "Right call.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Spot on! Ghostwriting routine communications is over-control. It offers zero learning value or autonomy.", rationaleIncorrect: "This statement represents Control. It removes problem-solving from the employee." },
      { text: "Whenever you join vendor calls, keep your mic on mute and let me field all questions so we stay on message.", category: "Control", hint: "MENTOR HINT: Focus on whether rigid formatting constraints are replacing personal discretion.", headerCorrect: "Exactly.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Correct! Benchwarmer mandates are over-control, preventing team members from building authority.", rationaleIncorrect: "This statement represents Control. Muting team members signals distrust." },
      { text: "I set up a shared tracker where you need to log the exact start and end times for each project sub-task throughout the day.", category: "Control", hint: "MENTOR HINT: Notice the requirement to log output in granular time blocks.", headerCorrect: "Spot on.", headerIncorrect: "Miscalibration.", rationaleCorrect: "You caught it. High-frequency task logging is over-control that creates administrative overhead.", rationaleIncorrect: "This statement represents Control. Granular task logging degrades trust." },

      // COACH
      { text: "I noticed project milestones slipped twice this month. Let me know what bottlenecks you are running into so we can adjust.", category: "Coach", hint: "MENTOR HINT: The manager is asking an open question focused on obstacles rather than placing personal blame.", headerCorrect: "Nice call.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Spot on. This is Coaching. It focuses neutrally on systemic roadblocks rather than placing personal blame.", rationaleIncorrect: "This statement represents Coaching. It asks open questions to help the employee solve bottlenecks." },
      { text: "Walk me through how you arrived at this forecast model. I want to understand your assumptions before we sign off.", category: "Coach", hint: "MENTOR HINT: Watch for questions designed to prompt self-reflection after an event.", headerCorrect: "Correct.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Right call. This is Coaching. It encourages critical reflection without taking over the deliverable.", rationaleIncorrect: "This statement represents Coaching. Prompting critical reasoning builds capability." },
      { text: "What support or resources do you need from me to feel confident presenting this strategy to the leadership team next week?", category: "Coach", hint: "MENTOR HINT: The leader offers assistance while leaving execution firmly in the team member's hands.", headerCorrect: "Spot on.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Exactly. Empowering the individual to define their own support needs is active Coaching.", rationaleIncorrect: "This statement represents Coaching. Offering targeted support builds confidence." },
      { text: "Your recent client presentation had great energy. How do you feel about the Q&A segment, and where could we refine it?", category: "Coach", hint: "MENTOR HINT: Promoting self-assessment first rather than imposing top-down feedback.", headerCorrect: "Right call.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Correct! Promoting self-assessment first rather than imposing top-down feedback is core Coaching.", rationaleIncorrect: "This statement represents Coaching. Guided self-reflection is key to performance growth." },
      { text: "Since you managed the pilot phase, what adjustments would you recommend before we scale this process nationwide?", category: "Coach", hint: "MENTOR HINT: Look for questions aimed at assessing comprehension and analytical insight.", headerCorrect: "Exactly.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Spot on! Validating subject-matter expertise and seeking input is empowering Coaching behavior.", rationaleIncorrect: "This statement represents Coaching. Seeking operational input fosters ownership." },

      // DIRECT
      { text: "Your presentation was clear. Next time, include raw data points on Slide 4 to back up your ROI claims.", category: "Direct", hint: "MENTOR HINT: Look for a clear, actionable expectation being set without taking over the actual task.", headerCorrect: "Correct.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Right call. Giving clear, specific adjustments sets objective expectations without policing style.", rationaleIncorrect: "This statement represents Direct leadership. It provides clear, actionable parameters." },
      { text: "To hit our Q3 SLA target, all tier-1 escalation tickets must receive an initial response within 2 hours of arrival.", category: "Direct", hint: "MENTOR HINT: Notice explicit parameters regarding deadline and location without dictating how the work gets done.", headerCorrect: "Spot on.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Exactly. Setting explicit, quantitative metrics for execution is Direct leadership.", rationaleIncorrect: "This statement represents Direct leadership. It sets clear operational performance standards." },
      { text: "Please format all client-facing financial summaries using the standard Q3 template located on the share drive.", category: "Direct", hint: "MENTOR HINT: Focus on standard policy enforcement without micromanaging the process.", headerCorrect: "Right call.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Correct! Enforcing standard templates is Direct leadership that ensures quality governance.", rationaleIncorrect: "This statement represents Direct leadership. Standardizing process output is essential governance." },
      { text: "In future weekly status updates, open with key risks first before detailing project progress highlights.", category: "Direct", hint: "MENTOR HINT: Notice operational ground rules being established for meeting efficiency.", headerCorrect: "Exactly.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Spot on. Establishing communication protocols for decision-making is clear Direct leadership.", rationaleIncorrect: "This statement represents Direct leadership. Restructuring reporting formats increases clarity." },
      { text: "Ensure all budget variance notes include a brief risk analysis prior to end-of-month submission.", category: "Direct", hint: "MENTOR HINT: Defining procedural compliance steps removes ambiguity and is Direct leadership.", headerCorrect: "Spot on.", headerIncorrect: "Miscalibration.", rationaleCorrect: "Right call! Defining procedural compliance steps removes ambiguity and is Direct leadership.", rationaleIncorrect: "This statement represents Direct leadership. Explicit procedural guidelines prevent rework." }
    ];

    // Shuffle deck
    for (var i = window.gameDeck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = window.gameDeck[i];
      window.gameDeck[i] = window.gameDeck[j];
      window.gameDeck[j] = temp;
    }
  }

  // Force active card and scenario text to write directly
  var safeIdx = currentIndex % window.gameDeck.length;
  var card = window.gameDeck[safeIdx];
  window.activeCard = card;

  if (card && card.text) {
    player.SetVar("currentScenarioText", String(card.text));
  }
} catch (err) {
  console.log("Timeline Start Error: " + err.message);
}
}

window.Script3 = function()
{
  try {
  var player = GetPlayer();
  var userChoice = "Coach";

  var idx = parseInt(player.GetVar("scenariosPlayed"), 10) || 0;
  var deck = window.gameDeck || [];
  var card = deck[idx % deck.length];

  if (card) {
    var cardCat = String(card.category || "").trim().toLowerCase();
    var isCorrect = (cardCat === userChoice.toLowerCase());

    if (isCorrect) {
      var currentScore = parseInt(player.GetVar("moraleScore"), 10) || 0;
      player.SetVar("moraleScore", Math.min(100, currentScore + 20));
    }

    var rat = isCorrect ? card.rationaleCorrect : card.rationaleIncorrect;
    player.SetVar("feedbackText", String(rat || ""));
  }
} catch (err) {
  console.log("Coach Error: " + err.message);
}
}

window.Script4 = function()
{
  try {
  var player = GetPlayer();
  var userChoice = "Direct";

  var idx = parseInt(player.GetVar("scenariosPlayed"), 10) || 0;
  var deck = window.gameDeck || [];
  var card = deck[idx % deck.length];

  if (card) {
    var cardCat = String(card.category || "").trim().toLowerCase();
    var isCorrect = (cardCat === userChoice.toLowerCase());

    if (isCorrect) {
      var currentScore = parseInt(player.GetVar("moraleScore"), 10) || 0;
      player.SetVar("moraleScore", Math.min(100, currentScore + 20));
    }

    var rat = isCorrect ? card.rationaleCorrect : card.rationaleIncorrect;
    player.SetVar("feedbackText", String(rat || ""));
  }
} catch (err) {
  console.log("Direct Error: " + err.message);
}
}

window.Script5 = function()
{
  try {
  var player = GetPlayer();
  var userChoice = "Control";

  var idx = parseInt(player.GetVar("scenariosPlayed"), 10) || 0;
  var deck = window.gameDeck || [];
  var card = deck[idx % deck.length];

  if (card) {
    var cardCat = String(card.category || "").trim().toLowerCase();
    var isCorrect = (cardCat === userChoice.toLowerCase());

    if (isCorrect) {
      var currentScore = parseInt(player.GetVar("moraleScore"), 10) || 0;
      player.SetVar("moraleScore", Math.min(100, currentScore + 20));
    }

    var rat = isCorrect ? card.rationaleCorrect : card.rationaleIncorrect;
    player.SetVar("feedbackText", String(rat || ""));
  }
} catch (err) {
  console.log("Control Error: " + err.message);
}
}

window.Script6 = function()
{
  try {
  var player = GetPlayer();
  var passes = parseInt(player.GetVar("MentorPassCount"), 10);
  if (isNaN(passes)) { passes = 1; }

  if (passes > 0) {
    // Decrement pass count
    player.SetVar("MentorPassCount", passes - 1);

    // Fetch hint string specifically
    var hintText = "MENTOR HINT: Evaluate whether this action guides, directs, or controls.";
    if (window.activeCard && window.activeCard.hint) {
      hintText = window.activeCard.hint;
    }

    // Assign directly to your mentorHintText variable
    player.SetVar("mentorHintText", String(hintText));
  }
} catch (err) {
  console.log("Hotspot Error: " + err.message);
}
}

window.Script7 = function()
{
  try {
  var player = GetPlayer();

  // 1. Advance the scenariosPlayed counter by 1
  var currentIdx = parseInt(player.GetVar("scenariosPlayed"), 10) || 0;
  var nextIdx = currentIdx + 1;
  player.SetVar("scenariosPlayed", nextIdx);

  // 2. Load the next card into activeCard and currentScenarioText
  if (nextIdx < 5 && window.gameDeck && window.gameDeck[nextIdx]) {
    var nextCard = window.gameDeck[nextIdx];
    window.activeCard = nextCard;
    player.SetVar("currentScenarioText", String(nextCard.text));
  }
} catch (err) {
  console.log("Error advancing scenario: " + err.message);
}
}

window.Script8 = function()
{
  const player = GetPlayer();
const morale = player.GetVar("moraleScore");
const productivity = player.GetVar("productivityScore");
const avgScore = (morale + productivity) / 2;

let rank = "";
let feedback = "";

if (avgScore >= 85) {
  rank = "CALIBRATED LEADER (Tier 1)";
} else if (avgScore >= 65) {
  rank = "DIRECTIVE MANAGER (Tier 2)";
} else {
  rank = "HIGH-CONTROL OVER-OPERATOR (Tier 3)";
}

player.SetVar("leadershipRank", rank);
}

window.Script9 = function()
{
  try {
  var simDeck = [
    // --- Scenarios 1-5 ---
    { 
      text: "A senior team member is falling behind on a high-stakes client report due at 5 PM today.",
      idealStruct: 4, idealCtrl: 2,
      hint: "MENTOR HINT: Senior members need high target clarity, but micromanaging their daily execution destroys momentum.",
      goodFeedback: "EXCELLENT CALIBRATION\nHigh structural clarity with targeted check-ins ensures 5 PM delivery without stripping ownership.",
      badFeedback: "MISCALIBRATION\nHigh operational intervention here creates panic and dependency. Focus on setting clear milestones (Structure) rather than taking over execution (Control)."
    },
    { 
      text: "Your team is adopting a new software tool, and initial compliance is sluggish across departments.",
      idealStruct: 5, idealCtrl: 1,
      hint: "MENTOR HINT: Systemic adoption requires firm governance parameters, but daily usage shouldn't be micromanaged.",
      goodFeedback: "SPOT ON\nSetting strict compliance protocols yields solid long-term adoption while respecting team autonomy.",
      badFeedback: "MISCALIBRATION\nMicromanaging daily usage creates friction. Establish firm boundary standards (Structure) and leave execution open (Control)."
    },
    { 
      text: "A routine monthly financial recap contained minor formatting errors in the appendix.",
      idealStruct: 2, idealCtrl: 1,
      hint: "MENTOR HINT: Minor details in routine tasks warrant lightweight template guidance rather than direct intervention.",
      goodFeedback: "RIGHT CALL\nMinor formatting errors require low intervention. Providing standard templates handles governance cleanly.",
      badFeedback: "MISCALIBRATION\nOver-controlling routine formatting edits wastes executive bandwidth. Keep intervention minimal."
    },
    { 
      text: "An experienced project manager asks to restructure their weekly deliverable schedule.",
      idealStruct: 2, idealCtrl: 1,
      hint: "MENTOR HINT: Experienced leads deliver best when given high autonomy over their workflow schedule.",
      goodFeedback: "EXCELLENT CALIBRATION\nExperienced team members thrive with high autonomy. Outcome standards matter more than rigid schedule control.",
      badFeedback: "MISCALIBRATION\nImposing heavy control on experienced staff degrades trust. Focus on deliverables, not schedule policing."
    },
    { 
      text: "Two junior analysts are stuck in an operational disagreement regarding data validation steps.",
      idealStruct: 4, idealCtrl: 2,
      hint: "MENTOR HINT: Less experienced staff need concrete procedural guardrails to break execution standstills.",
      goodFeedback: "SPOT ON\nJunior team members need explicit procedural clarity to resolve technical ambiguity effectively.",
      badFeedback: "MISCALIBRATION\nLow structural guidance leaves junior staff floating. Provide clearer execution standards."
    },

    // --- Scenarios 6-10 ---
    { 
      text: "A critical vendor missed an SLA milestone, putting a key sprint deliverable at risk.",
      idealStruct: 5, idealCtrl: 4,
      hint: "MENTOR HINT: Vendor breaches demand immediate tight intervention and rigid compliance tracking until stabilized.",
      goodFeedback: "EXCELLENT CALIBRATION\nHigh structure and firm direct intervention are vital to realign external compliance fast.",
      badFeedback: "MISCALIBRATION\nA passive approach on vendor breaches causes compounding delay. High control is warranted here."
    },
    { 
      text: "A high-performing cross-functional squad is launching an experimental pilot program.",
      idealStruct: 2, idealCtrl: 1,
      hint: "MENTOR HINT: Innovation pilots require high psychological safety and dynamic flexibility to test hypothesis.",
      goodFeedback: "SPOT ON\nMinimal intervention empowers high performers to innovate rapidly without administrative drag.",
      badFeedback: "MISCALIBRATION\nOver-structuring pilot programs stifles creative iteration. Grant space for exploration."
    },
    { 
      text: "A mid-level developer has repeatedly missed daily standup syncs over the past two weeks.",
      idealStruct: 4, idealCtrl: 3,
      hint: "MENTOR HINT: Repeated attendance slippage requires clear boundary reset paired with a direct conversation.",
      goodFeedback: "RIGHT CALL\nEstablishing clear operational boundaries while directly addressing the pattern corrects the behavior.",
      badFeedback: "MISCALIBRATION\nIgnoring repeat pattern breaches damages team accountability. Re-establish structural norms."
    },
    { 
      text: "The team is transitioning to a brand-new compliance framework mandated by regulatory updates.",
      idealStruct: 5, idealCtrl: 2,
      hint: "MENTOR HINT: Regulatory compliance demands strict non-negotiable boundaries, but execution relies on team workflow.",
      goodFeedback: "EXCELLENT CALIBRATION\nClear non-negotiable parameters protect regulatory compliance without hover-managing output.",
      badFeedback: "MISCALIBRATION\nWeak regulatory guidelines risk compliance penalties. Structural parameters must be set to max."
    },
    { 
      text: "An internal communications strategy needs a fresh format to boost overall employee engagement.",
      idealStruct: 1, idealCtrl: 1,
      hint: "MENTOR HINT: Creative initiatives flourish best under open inquiry and zero micromanagement.",
      goodFeedback: "SPOT ON\nLow structure and zero control allow creative problem-solving to produce fresh ideas.",
      badFeedback: "MISCALIBRATION\nImposing strict templates on engagement strategy limits creative problem-solving."
    },

    // --- Scenarios 11-15 ---
    { 
      text: "A department workflow handoff between Design and Engineering is causing constant delays.",
      idealStruct: 5, idealCtrl: 2,
      hint: "MENTOR HINT: Inter-departmental friction requires redesigning handoff protocol standards.",
      goodFeedback: "RIGHT CALL\nRedesigning handoff protocols resolves friction points without taking over daily department tasks.",
      badFeedback: "MISCALIBRATION\nStepping in to hand-manage daily handoffs creates an executive bottleneck. Fix the process structure."
    },
    { 
      text: "A new team lead is taking over a legacy project with unclear historical documentation.",
      idealStruct: 4, idealCtrl: 3,
      hint: "MENTOR HINT: Onboarding leads into messy legacy environments requires active guidance and structured milestones.",
      goodFeedback: "EXCELLENT CALIBRATION\nProviding structured milestones and supportive syncs accelerates leadership transition.",
      badFeedback: "MISCALIBRATION\nLeaving a new lead in an ambiguous legacy structure leads to burnout. Provide clear guardrails."
    },
    { 
      text: "Budget cuts require your team to re-prioritize Q4 initiatives within 48 hours.",
      idealStruct: 4, idealCtrl: 4,
      hint: "MENTOR HINT: Urgent triage crises require decisive structural calls and active direction.",
      goodFeedback: "SPOT ON\nRapid turnaround crises require firm leadership direction and active execution management.",
      badFeedback: "MISCALIBRATION\nLow structure during a 48-hour crisis creates organizational paralysis. Drive decisive direction."
    },
    { 
      text: "A seasoned employee expresses interest in taking on strategic planning responsibilities.",
      idealStruct: 2, idealCtrl: 1,
      hint: "MENTOR HINT: Stretch opportunities for seasoned staff require delegation with room to stretch.",
      goodFeedback: "RIGHT CALL\nDelegating strategic ownership builds talent pipeline while demonstrating executive trust.",
      badFeedback: "MISCALIBRATION\nMicromanaging a stretch opportunity undermines the development purpose. Empower ownership."
    },
    { 
      text: "A key stakeholder requested an unannounced progress demo for tomorrow morning.",
      idealStruct: 3, idealCtrl: 3,
      hint: "MENTOR HINT: Surprise stakeholder requests need moderate coordination alignment without derailing weekly goals.",
      goodFeedback: "EXCELLENT CALIBRATION\nBalanced check-ins ensure demo readiness while protecting ongoing operational sprint goals.",
      badFeedback: "MISCALIBRATION\nOverreacting with extreme control creates panic. Maintain balanced situational posture."
    }
  ];

  // Fisher-Yates Shuffle Algorithm (Selects 5 random scenarios out of 15)
  for (var i = simDeck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = simDeck[i];
    simDeck[i] = simDeck[j];
    simDeck[j] = temp;
  }

  // Store shuffled deck globally
  window.simGameDeck = simDeck;

  // Initialize Storyline Player Variables
  var player = GetPlayer();
  if (window.simGameDeck && window.simGameDeck.length > 0) {
    player.SetVar("currentSimText", window.simGameDeck[0].text);
    player.SetVar("simRound", 1);
    player.SetVar("totalStructureScore", 0);
    player.SetVar("totalControlScore", 0);
    player.SetVar("calibrationAccuracyScore", 0);
    player.SetVar("sliderStructure", 3);
    player.SetVar("sliderControl", 3);
  }

} catch (err) {
  alert("Deck Init Error: " + err.message);
}
}

window.Script10 = function()
{
  try {
  var player = GetPlayer();

  var currentStructure = parseInt(player.GetVar("sliderStructure")) || 3;
  var currentControl = parseInt(player.GetVar("sliderControl")) || 3;
  var totalStruct = parseInt(player.GetVar("totalStructureScore")) || 0;
  var totalCtrl = parseInt(player.GetVar("totalControlScore")) || 0;
  var accuracy = parseInt(player.GetVar("calibrationAccuracyScore")) || 0;
  var round = parseInt(player.GetVar("simRound")) || 1;

  // 1. Evaluate Current Scenario
  if (window.simGameDeck && window.simGameDeck.length > 0) {
    var scenario = window.simGameDeck[0];
    var structDiff = Math.abs(currentStructure - scenario.idealStruct);
    var ctrlDiff = Math.abs(currentControl - scenario.idealCtrl);
    var totalDiff = structDiff + ctrlDiff;

    var selectedFeedback = "";
    if (totalDiff <= 1) {
      selectedFeedback = scenario.goodFeedback;
      accuracy += 20;
    } else if (totalDiff <= 3) {
      selectedFeedback = "ACCEPTABLE ADJUSTMENT\nYour settings hit near target parameters, though slight alignment tweaks would optimize team output.";
      accuracy += 12;
    } else {
      selectedFeedback = scenario.badFeedback;
      accuracy += 5;
    }

    player.SetVar("rationaleText", selectedFeedback);
  }

  // 2. Update Accumulating Metrics
  totalStruct += currentStructure;
  totalCtrl += currentControl;

  player.SetVar("totalStructureScore", totalStruct);
  player.SetVar("totalControlScore", totalCtrl);
  player.SetVar("calibrationAccuracyScore", accuracy);

  // 3. Final Round Evaluation (Round 5)
  if (round >= 5) {
    // Assign Medal String
    var medal = "Bronze";
    if (accuracy >= 85) {
      medal = "Gold";
    } else if (accuracy >= 65) {
      medal = "Silver";
    }
    player.SetVar("leaderMedalAward", medal);

    // Assign Leader Title String
    var title = "";
    if (accuracy >= 85) {
      title = "<b>MASTER CALIBRATOR</b>\nTier 1 Leadership";
    } else if (accuracy >= 65) {
      title = "<b>CALIBRATED OPERATOR</b>\nTier 2 Leadership";
    } else {
      title = "<b>DEVELOPING STRATEGIST</b>\nNeeds Recalibration";
    }
    player.SetVar("leaderTitleAward", title);

    // Assign Leader Profile Description
    var avgCtrl = totalCtrl / 5;
    var avgStruct = totalStruct / 5;
    var profile = "";

    if (avgCtrl >= 3.8) {
      profile = "<b>THE OVER-CONTROLLER</b>\nYour default instinct leans toward high operational intervention. You step directly into execution rather than allowing room for autonomous delivery.";
    } else if (avgStruct >= 3.5 && avgCtrl < 3.0) {
      profile = "<b>THE DIRECTIVE ARCHITECT</b>\nYou excel at establishing clear standards and guardrails while leaving operational execution space to the team.";
    } else if (avgStruct < 3.0 && avgCtrl < 3.0) {
      profile = "<b>THE EMPOWERING COACH</b>\nYou lead primarily through inquiry and autonomy, encouraging high team ownership.";
    } else {
      profile = "<b>THE ADAPTIVE MANAGER</b>\nYou maintain a balanced posture, adjusting structure and intervention based on situational demands.";
    }
    player.SetVar("leaderProfileResult", profile);
  }

} catch (err) {
  alert("Submit Error: " + err.message);
}
}

window.Script11 = function()
{
  try {
  var player = GetPlayer();
  var hintsLeft = player.GetVar("mentorHintsLeft");

  if (hintsLeft >= 0 && window.simGameDeck && window.simGameDeck.length > 0) {
    var currentHint = window.simGameDeck[0].hint;
    player.SetVar("mentorHintText", currentHint);
  }
} catch (err) {
  alert("Hint JS Error: " + err.message);
}
}

window.Script12 = function()
{
  try {
  var player = GetPlayer();
  var round = player.GetVar("simRound") || 1;

  // Only shift array if we have more scenarios left
  if (window.simGameDeck && window.simGameDeck.length > 1) {
    window.simGameDeck.shift(); // Remove completed scenario
    player.SetVar("currentSimText", window.simGameDeck[0].text);
    player.SetVar("sliderStructure", 3);
    player.SetVar("sliderControl", 3);
  }
} catch (err) {
  alert("Next Scenario Error: " + err.message);
}
}

};
