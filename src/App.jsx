import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard, Wallet, Landmark, PiggyBank, Plus, Trash2,
  ChevronDown, ChevronRight, ArrowDownCircle, ArrowUpCircle,
  Save, Check, Loader2, X, NotebookPen, TrendingUp, TrendingDown, IndianRupee,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Seed data — pulled from the user's original spreadsheet             */
/* ------------------------------------------------------------------ */
const SEED_DATA = {"years":["2025-26","2026-27"],"expenses":{"2025-26":[{"month":"Apr","opening":470736,"closing":228793.07,"events":[{"label":"Interest Earned","credit":1245,"debit":0,"note":""},{"label":"Credit card payments","credit":0,"debit":21288.42,"note":""},{"label":"MF","credit":0,"debit":100000,"note":""},{"label":"bought utensils","credit":0,"debit":18330,"note":""},{"label":"jpmc mouse/keyboard reiumburment","credit":4358,"debit":0,"note":""},{"label":"lakshmi akka","credit":0,"debit":100000,"note":""},{"label":"given to dad","credit":0,"debit":30000,"note":""},{"label":"Salary","credit":197099,"debit":0,"note":""},{"label":"chits","credit":0,"debit":97900,"note":""},{"label":"Misc","credit":0,"debit":14316,"note":""},{"label":"trading","credit":0,"debit":50000,"note":""}],"expensesTotal":53934.42,"investmentsTotal":327900},{"month":"May","opening":228793.07,"closing":227654.07,"events":[{"label":"Misc","credit":35,"debit":6542,"note":""},{"label":"Credit card payments","credit":0,"debit":14073,"note":""},{"label":"MF","credit":0,"debit":100000,"note":""},{"label":"trading","credit":49911,"debit":0,"note":""},{"label":"given to dad","credit":0,"debit":30000,"note":""},{"label":"chits","credit":0,"debit":97500,"note":""},{"label":"salary","credit":197100,"debit":0,"note":""}],"expensesTotal":20615,"investmentsTotal":227500},{"month":"Jun","opening":227654.07,"closing":172531.92,"events":[{"label":"Misc","credit":0,"debit":8631.51,"note":""},{"label":"Credit card payments","credit":0,"debit":45931.64,"note":""},{"label":"chits","credit":0,"debit":97100,"note":""},{"label":"Rythu bandu","credit":28420,"debit":60000,"note":"MF"},{"label":"given to dad","credit":0,"debit":60000,"note":""},{"label":"trading","credit":0,"debit":9000,"note":""},{"label":"salary","credit":197099,"debit":0,"note":""}],"expensesTotal":54563.15,"investmentsTotal":217100},{"month":"Jul","opening":172531.92,"closing":187981.15,"events":[{"label":"Misc","credit":0,"debit":2746,"note":""},{"label":"Credit card payments","credit":0,"debit":32017.27,"note":""},{"label":"Interest","credit":813,"debit":0,"note":""},{"label":"chits","credit":0,"debit":96700,"note":""},{"label":"trading","credit":0,"debit":20999.5,"note":""},{"label":"given to dad","credit":0,"debit":10000,"note":""},{"label":"given to mounica (rakhi)","credit":0,"debit":20000,"note":""},{"label":"salary","credit":197099,"debit":0,"note":""}],"expensesTotal":34763.270000000004,"investmentsTotal":126700},{"month":"Aug","opening":187981.15,"closing":246483.55000000002,"events":[{"label":"Misc","credit":2000,"debit":11987.6,"note":""},{"label":"Credit card payments","credit":0,"debit":17909,"note":""},{"label":"chits","credit":0,"debit":96300,"note":""},{"label":"zerodha swing trading","credit":0,"debit":50000,"note":""},{"label":"pradeep returned","credit":50000,"debit":0,"note":""},{"label":"ndsl ipo","credit":0,"debit":14400,"note":""},{"label":"salary","credit":197099,"debit":0,"note":""}],"expensesTotal":29896.6,"investmentsTotal":96300},{"month":"Sep","opening":246483.55,"closing":315544.55,"events":[{"label":"Misc","credit":0,"debit":6205,"note":""},{"label":"Credit card payments","credit":0,"debit":13822,"note":""},{"label":"chits","credit":0,"debit":79800,"note":""},{"label":"given to pradeep","credit":0,"debit":20000,"note":""},{"label":"given to MR Reddy for bottles","credit":0,"debit":7500,"note":""},{"label":"Interest","credit":689,"debit":0,"note":""},{"label":"salary","credit":195699,"debit":0,"note":""}],"expensesTotal":27527,"investmentsTotal":79800},{"month":"Oct","opening":315544.55,"closing":343903.16000000003,"events":[{"label":"Misc","credit":0,"debit":5101,"note":""},{"label":"Credit card payments","credit":0,"debit":36826.15,"note":""},{"label":"chits","credit":0,"debit":79300,"note":""},{"label":"returned by pradeep","credit":20000,"debit":0,"note":""},{"label":"Tata cap IPO + LG IPO + CRAMC IPO","credit":0,"debit":70466,"note":""},{"label":"zerodha","credit":69050.26,"debit":140000,"note":""},{"label":"Interest","credit":23,"debit":0,"note":""},{"label":"mr reddy for whiskey","credit":1250,"debit":0,"note":""},{"label":"salary","credit":195698,"debit":0,"note":""},{"label":"Dividens","credit":30.5,"debit":0,"note":""},{"label":"kalpana chitti","credit":74000,"debit":0,"note":""}],"expensesTotal":41927.15,"investmentsTotal":79300},{"month":"Nov","opening":343903.16,"closing":336273.1599999999,"events":[{"label":"Misc","credit":2000,"debit":0,"note":""},{"label":"tirupati plan included","credit":0,"debit":6397,"note":""},{"label":"Credit card payments","credit":0,"debit":48223,"note":""},{"label":"chits","credit":0,"debit":78800,"note":""},{"label":"pine labs + emmvee ipo","credit":0,"debit":56908,"note":""},{"label":"given to dad","credit":0,"debit":15000,"note":""},{"label":"salary","credit":195698,"debit":0,"note":""}],"expensesTotal":54620,"investmentsTotal":93800},{"month":"Dec","opening":336273.16,"closing":356335.6499999999,"events":[{"label":"Misc","credit":7,"debit":6929.51,"note":""},{"label":"Credit card payments","credit":0,"debit":32992,"note":""},{"label":"CC Tv","credit":0,"debit":14000,"note":""},{"label":"chits","credit":0,"debit":78300,"note":""},{"label":"zerodha","credit":50000,"debit":0,"note":""},{"label":"golla olu","credit":0,"debit":74813,"note":""},{"label":"mahender babai","credit":181392,"debit":0,"note":""},{"label":"nandikonda vijaya","credit":0,"debit":200000,"note":""},{"label":"salary","credit":195698,"debit":0,"note":""}],"expensesTotal":53921.51,"investmentsTotal":278300},{"month":"Jan","opening":356335.65,"closing":505502.4700000001,"events":[{"label":"Misc","credit":164.5,"debit":3456,"note":""},{"label":"Credit card payments","credit":0,"debit":26693,"note":""},{"label":"zerodha","credit":110802.32,"debit":0,"note":""},{"label":"chits","credit":0,"debit":77800,"note":""},{"label":"hemanth reddy","credit":0,"debit":200000,"note":""},{"label":"vamshi(rohith marriage)","credit":0,"debit":1150,"note":""},{"label":"withdrawn","credit":0,"debit":110000,"note":""},{"label":"salary","credit":457299,"debit":0,"note":""}],"expensesTotal":31299,"investmentsTotal":277800},{"month":"Feb","opening":505502,"closing":540552,"events":[{"label":"Misc","credit":841,"debit":7323,"note":"(841 ttd refund credit)"},{"label":"vasavi satram donation","credit":0,"debit":2116,"note":""},{"label":"Credit card payments","credit":0,"debit":26809,"note":""},{"label":"interiors","credit":0,"debit":67500,"note":""},{"label":"atm withdrawal(expenses) tirupathi expenses included","credit":0,"debit":13000,"note":""},{"label":"MR reddy bottles","credit":0,"debit":7500,"note":""},{"label":"zerodha","credit":0,"debit":50000,"note":""},{"label":"chits","credit":0,"debit":52300,"note":""},{"label":"salary","credit":260757,"debit":0,"note":""}],"expensesTotal":43748,"investmentsTotal":52300},{"month":"Mar","opening":540552,"closing":603404.49,"events":[{"label":"Misc","credit":8001,"debit":6985,"note":"rythu bandu + pm kisan"},{"label":"Credit card payments","credit":0,"debit":52982.51,"note":"cupbords bill inc"},{"label":"chits","credit":0,"debit":51800,"note":""},{"label":"zerodha","credit":0,"debit":80000,"note":""},{"label":"withdrawn(giv to dad)","credit":0,"debit":10000,"note":""},{"label":"salary","credit":256619,"debit":0,"note":""}],"expensesTotal":69967.51000000001,"investmentsTotal":51800}],"2026-27":[{"month":"Apr","opening":603404,"closing":622647.16,"events":[{"label":"atm withdrawal","credit":0,"debit":14900,"note":"10k given to dad"},{"label":"Misc","credit":7922,"debit":13626,"note":"rythu bandhu credit / includes pradeep marriage gift 2k"},{"label":"Credit card payments","credit":0,"debit":28409,"note":""},{"label":"chitti","credit":0,"debit":101300,"note":""},{"label":"zerodha","credit":119126.16,"debit":0,"note":""},{"label":"given to tharun","credit":0,"debit":150000,"note":""},{"label":"salary","credit":200430,"debit":0,"note":""}],"expensesTotal":56935,"investmentsTotal":101300},{"month":"May","opening":622647.2,"closing":1166083.38,"events":[{"label":"atm withdrawal","credit":0,"debit":5000,"note":"2000 to venkat wallet + 3000 salma jeetam"},{"label":"Misc","credit":0,"debit":23473.82,"note":"includes car camera display 12k"},{"label":"Credit card payments","credit":0,"debit":28459,"note":""},{"label":"chitti","credit":0,"debit":100800,"note":""},{"label":"zerodha","credit":0,"debit":230000,"note":""},{"label":"jyothi pinni chitti matured","credit":580000,"debit":0,"note":""},{"label":"tharun returned back","credit":150000,"debit":0,"note":""},{"label":"salary","credit":201169,"debit":0,"note":""}],"expensesTotal":56932.82,"investmentsTotal":330800},{"month":"Jun","opening":1166083,"closing":216857.49,"events":[{"label":"Misc","credit":760,"debit":8989.51,"note":"credit itr refund"},{"label":"Credit card payments","credit":0,"debit":27165,"note":""},{"label":"chitti","credit":0,"debit":100000,"note":""},{"label":"zerodha","credit":100000,"debit":300000,"note":""},{"label":"hemanth reddy","credit":0,"debit":800000,"note":""},{"label":"salary","credit":186169,"debit":0,"note":""}],"expensesTotal":36154.51,"investmentsTotal":1200000}]},"salary":{"2026-27":[{"month":"Apr","gross":273599.26,"tax":47752,"ptax":200,"epf":10217,"misc":15000},{"month":"May","gross":273599.26,"tax":47013,"ptax":200,"epf":10217,"misc":15000}],"2025-26":[{"month":"Apr","gross":244529.27,"tax":37943,"ptax":200,"epf":9287,"misc":0},{"month":"May","gross":246505.48,"tax":39919,"ptax":200,"epf":9287,"misc":0},{"month":"Jun","gross":244529.27,"tax":37943,"ptax":200,"epf":9287,"misc":0},{"month":"Jul","gross":244529.27,"tax":37943,"ptax":200,"epf":9287,"misc":0},{"month":"Aug","gross":244529.27,"tax":37943,"ptax":200,"epf":9287,"misc":0},{"month":"Sep","gross":244529.27,"tax":37943,"ptax":200,"epf":9287,"misc":1401},{"month":"Oct","gross":244529.27,"tax":37943,"ptax":200,"epf":9287,"misc":1401},{"month":"Nov","gross":244529.27,"tax":37943,"ptax":200,"epf":9287,"misc":1401},{"month":"Dec","gross":244529.27,"tax":37943,"ptax":200,"epf":9287,"misc":1401},{"month":"Jan","gross":644529.27,"tax":162744,"ptax":200,"epf":9287,"misc":15000},{"month":"Feb","gross":360210.29,"tax":74036,"ptax":200,"epf":10217,"misc":15000},{"month":"Mar","gross":351287.59,"tax":71252,"ptax":200,"epf":10217,"misc":15000}]},"mf":{"2025-26":[{"month":"Apr","amount":100000,"note":""},{"month":"May","amount":100000,"note":""},{"month":"Jun","amount":60000,"note":""},{"month":"Jul","amount":60000,"note":"dad's money"}]}};

const MONTHS = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const STORAGE_KEY = "finance-ledger-data-v1";

const fmt = (n) => {
  const num = Number(n) || 0;
  return num.toLocaleString("en-IN", { maximumFractionDigits: 0 });
};
const fmtSigned = (n) => {
  const num = Number(n) || 0;
  return (num < 0 ? "-" : "") + "₹" + fmt(Math.abs(num));
};

function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

function emptyExpenseMonth(month, opening) {
  return {
    month, opening: opening ?? 0, closing: opening ?? 0, events: [],
    expensesTotal: 0, investmentsTotal: 0,
    openingLocked: false, expensesLocked: false, investmentsLocked: false,
  };
}
function emptySalaryMonth(month) {
  return { month, gross: 0, tax: 0, ptax: 0, epf: 0, misc: 0 };
}
function emptyMFMonth(month) {
  return { month, amount: 0, note: "" };
}

function computeClosing(m) {
  const credits = (m.events || []).reduce((s, e) => s + (Number(e.credit) || 0), 0);
  const debits = (m.events || []).reduce((s, e) => s + (Number(e.debit) || 0), 0);
  return { credits, debits, closing: (Number(m.opening) || 0) + credits - debits };
}

/* ------------------------------------------------------------------ */
/* Main App                                                            */
/* ------------------------------------------------------------------ */
export default function App() {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved
  const [tab, setTab] = useState("dashboard");
  const [year, setYear] = useState("2026-27");
  const saveTimer = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          // One-time fix: earlier versions filed these MF entries under 2026-27;
          // they actually belong to 2025-26.
          if (!parsed._mfYearFixed) {
            const stray = parsed.mf && parsed.mf["2026-27"];
            if (stray && stray.length) {
              parsed.mf["2025-26"] = [...(parsed.mf["2025-26"] || []), ...stray];
              delete parsed.mf["2026-27"];
            }
            parsed._mfYearFixed = true;
            try { await window.storage.set(STORAGE_KEY, JSON.stringify(parsed), false); } catch (e2) {}
          }
          if (!parsed._2425Removed) {
            const hasData =
              (parsed.expenses["2024-25"] && parsed.expenses["2024-25"].length) ||
              (parsed.salary["2024-25"] && parsed.salary["2024-25"].length) ||
              (parsed.mf["2024-25"] && parsed.mf["2024-25"].length);
            if (!hasData) {
              parsed.years = parsed.years.filter((y) => y !== "2024-25");
              delete parsed.expenses["2024-25"];
              delete parsed.salary["2024-25"];
              delete parsed.mf["2024-25"];
            }
            parsed._2425Removed = true;
            try { await window.storage.set(STORAGE_KEY, JSON.stringify(parsed), false); } catch (e3) {}
          }
          // One-time fix: earlier versions had truncated/incorrect event lists
          // for Apr/May/Jun 2026-27 (some rows from the original sheet were
          // dropped). Re-sync those specific months from the corrected data.
          if (!parsed._expensesSeedFixed) {
            const correctMonths = SEED_DATA.expenses["2026-27"] || [];
            if (parsed.expenses && parsed.expenses["2026-27"]) {
              parsed.expenses["2026-27"] = parsed.expenses["2026-27"].map((m) => {
                const fix = correctMonths.find((cm) => cm.month === m.month);
                return fix ? deepClone(fix) : m;
              });
            }
            parsed._expensesSeedFixed = true;
            try { await window.storage.set(STORAGE_KEY, JSON.stringify(parsed), false); } catch (e4) {}
          }
          // One-time fix: earlier versions also had a bogus "Entry" line in
          // most 2025-26 months — a duplicate of that month's own total row,
          // mistakenly stored as if it were a real event (double-counting).
          // Re-sync those months from the corrected data too.
          if (!parsed._expenses2025SeedFixed) {
            const correctMonths2025 = SEED_DATA.expenses["2025-26"] || [];
            if (parsed.expenses && parsed.expenses["2025-26"]) {
              parsed.expenses["2025-26"] = parsed.expenses["2025-26"].map((m) => {
                const fix = correctMonths2025.find((cm) => cm.month === m.month);
                return fix ? deepClone(fix) : m;
              });
            }
            parsed._expenses2025SeedFixed = true;
            try { await window.storage.set(STORAGE_KEY, JSON.stringify(parsed), false); } catch (e6) {}
          }
          // One-time fix: earlier versions only had 4 months (Apr-Jul) of
          // salary data for 2025-26 instead of the full year. Add any months
          // that are missing, without touching ones already entered/edited.
          if (!parsed._salarySeedFixed) {
            const correctRows = SEED_DATA.salary["2025-26"] || [];
            if (parsed.salary) {
              if (!parsed.salary["2025-26"]) parsed.salary["2025-26"] = [];
              const existingMonths = parsed.salary["2025-26"].map((r) => r.month);
              correctRows.forEach((cr) => {
                if (!existingMonths.includes(cr.month)) {
                  parsed.salary["2025-26"].push(deepClone(cr));
                }
              });
            }
            parsed._salarySeedFixed = true;
            try { await window.storage.set(STORAGE_KEY, JSON.stringify(parsed), false); } catch (e5) {}
          }
          setData(parsed);
          setYear(parsed.years[parsed.years.length - 1]);
        } else {
          setData(SEED_DATA);
          setYear(SEED_DATA.years[SEED_DATA.years.length - 1]);
        }
      } catch (e) {
        setData(SEED_DATA);
        setYear(SEED_DATA.years[SEED_DATA.years.length - 1]);
      }
      setLoaded(true);
    })();
  }, []);

  const persist = useCallback((next) => {
    setData(next);
    setSaveState("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify(next), false);
        setSaveState("saved");
      } catch (e) {
        setSaveState("idle");
      }
    }, 500);
  }, []);

  if (!loaded || !data) {
    return (
      <div style={{ minHeight: 500, display: "flex", alignItems: "center", justifyContent: "center", color: "#5B7A63", fontFamily: "IBM Plex Sans, sans-serif" }}>
        <Loader2 className="animate-spin" size={20} style={{ marginRight: 8 }} /> Opening ledger…
      </div>
    );
  }

  return (
    <div className="ledger-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .ledger-root {
          --paper: #EAF1E4;
          --paper-raised: #FAFDF6;
          --ink: #1B3527;
          --ink-soft: #4C6656;
          --rule: #C4D3BC;
          --rule-strong: #86A481;
          --credit: #2C6B4C;
          --credit-soft: #E4EFE1;
          --debit: #9B3B34;
          --debit-soft: #F5E7E4;
          --gold: #A9782E;
          --gold-soft: #F3EBD8;
          --focus: #2F6B4F;
          background:
            radial-gradient(circle at 18px 18px, rgba(143,169,138,0.16) 1px, transparent 1.4px) 0 0/24px 24px,
            var(--paper);
          color: var(--ink);
          font-family: 'IBM Plex Sans', sans-serif;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--rule-strong);
          box-shadow: 0 1px 2px rgba(27,53,39,0.06), 0 12px 32px -14px rgba(27,53,39,0.28);
          min-height: 600px;
          display: flex;
          flex-direction: column;
        }
        .ledger-root * { box-sizing: border-box; }
        .lg-mono { font-family: 'IBM Plex Mono', monospace; font-variant-numeric: tabular-nums; }
        .lg-display { font-family: 'Fraunces', serif; }

        .lg-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 26px; border-bottom: 3px double var(--rule-strong);
          background: linear-gradient(180deg, var(--paper-raised), #F3F8ED);
          position: relative;
        }
        .lg-brand { display: flex; align-items: center; gap: 12px; }
        .lg-brand-mark {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(155deg, var(--ink) 0%, #2C5741 100%);
          color: var(--paper-raised); display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 8px rgba(27,53,39,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .lg-title { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; letter-spacing: 0.2px; line-height: 1.15; }
        .lg-title .sub { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--ink-soft); font-weight: 400; display:block; margin-top:3px; letter-spacing: 1.4px; text-transform: uppercase; }

        .lg-save {
          display:flex; align-items:center; gap:6px; font-size:12px; color: var(--ink-soft);
          font-family: 'IBM Plex Mono', monospace; background: rgba(44,107,76,0.08); padding: 6px 12px;
          border-radius: 999px; border: 1px solid rgba(134,164,129,0.5);
        }

        .lg-body { display: flex; flex: 1; min-height: 0; }

        .lg-nav {
          width: 178px; border-right: 1.5px solid var(--rule-strong); padding: 18px 12px; background: var(--paper-raised);
          display: flex; flex-direction: column; gap: 3px;
        }
        .lg-nav-item {
          display:flex; align-items:center; gap:10px; padding: 10px 12px; border-radius: 9px; cursor: pointer;
          font-size: 13.5px; font-weight: 500; color: var(--ink-soft); transition: background .15s, color .15s, transform .15s;
          position: relative;
        }
        .lg-nav-item .lg-nav-icon {
          width: 26px; height: 26px; border-radius: 7px; display:flex; align-items:center; justify-content:center;
          background: rgba(47,107,79,0.08); color: var(--ink-soft); transition: background .15s, color .15s;
        }
        .lg-nav-item:hover { background: rgba(47,107,79,0.08); color: var(--ink); transform: translateX(1px); }
        .lg-nav-item.active { background: var(--ink); color: var(--paper-raised); box-shadow: 0 4px 10px -4px rgba(27,53,39,0.5); }
        .lg-nav-item.active .lg-nav-icon { background: rgba(255,255,255,0.16); color: var(--paper-raised); }
        .lg-nav-divider { height: 1px; background: var(--rule); margin: 10px 4px; }

        .lg-main {
          flex: 1; overflow-y: auto; padding: 24px 28px 44px;
          background-image: repeating-linear-gradient(180deg, rgba(134,164,129,0.07) 0, rgba(134,164,129,0.07) 1px, transparent 1px, transparent 33px);
        }

        .lg-year-row { display:flex; align-items:center; gap:8px; margin-bottom: 20px; flex-wrap: wrap; }
        .lg-year-pill {
          font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; padding: 6px 14px; border-radius: 999px;
          border: 1.3px solid var(--rule-strong); cursor: pointer; color: var(--ink-soft); background: var(--paper-raised);
          transition: all .15s; box-shadow: 0 1px 2px rgba(27,53,39,0.05);
        }
        .lg-year-pill:hover { border-color: var(--ink); color: var(--ink); }
        .lg-year-pill.active { background: linear-gradient(155deg, var(--ink), #2C5741); color: var(--paper-raised); border-color: var(--ink); box-shadow: 0 3px 8px -2px rgba(27,53,39,0.45); }
        .lg-year-add {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--gold); border: 1.3px dashed var(--gold);
          border-radius: 999px; padding: 6px 12px; cursor: pointer; background: transparent; display:flex; align-items:center; gap:4px;
          transition: background .15s;
        }
        .lg-year-add:hover { background: var(--gold-soft); }

        .lg-card {
          background: var(--paper-raised); border: 1.2px solid var(--rule); border-radius: 12px; padding: 16px 18px; margin-bottom: 16px;
          box-shadow: 0 1px 2px rgba(27,53,39,0.04), 0 6px 18px -12px rgba(27,53,39,0.3);
        }
        .lg-stat-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(160px,1fr)); gap: 12px; margin-bottom: 20px; }
        .lg-stat {
          background: var(--paper-raised); border: 1.2px solid var(--rule); border-radius: 12px; padding: 14px 16px 15px;
          position: relative; overflow: hidden; transition: transform .15s, box-shadow .15s;
          box-shadow: 0 1px 2px rgba(27,53,39,0.04), 0 6px 16px -12px rgba(27,53,39,0.28);
        }
        .lg-stat::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--stat-accent, var(--rule-strong)); }
        .lg-stat:hover { transform: translateY(-2px); box-shadow: 0 4px 14px -6px rgba(27,53,39,0.35); }
        .lg-stat-top { display:flex; align-items:center; justify-content:space-between; margin-bottom: 8px; }
        .lg-stat-icon { width: 26px; height: 26px; border-radius: 7px; display:flex; align-items:center; justify-content:center; background: var(--stat-accent-soft, var(--credit-soft)); color: var(--stat-accent, var(--credit)); }
        .lg-stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: var(--ink-soft); margin-bottom: 6px; }
        .lg-stat-value { font-family: 'IBM Plex Mono', monospace; font-size: 21px; font-weight: 600; }

        .lg-month-block {
          border: 1.2px solid var(--rule); border-radius: 12px; margin-bottom: 14px; background: var(--paper-raised); overflow: hidden;
          border-left: 4px solid var(--month-accent, var(--rule-strong)); transition: box-shadow .15s;
          box-shadow: 0 1px 2px rgba(27,53,39,0.04);
        }
        .lg-month-block:hover { box-shadow: 0 6px 16px -10px rgba(27,53,39,0.35); }
        .lg-month-head {
          display:flex; align-items:center; justify-content: space-between; padding: 13px 16px; cursor: pointer;
        }
        .lg-month-head:hover { background: rgba(47,107,79,0.05); }
        .lg-month-name { font-family:'Fraunces', serif; font-weight: 600; font-size: 17px; display:flex; align-items:center; gap:8px; }
        .lg-month-figs { display:flex; gap: 22px; align-items:center; }
        .lg-mini { text-align:right; }
        .lg-mini-label { font-size: 10px; text-transform:uppercase; color: var(--ink-soft); letter-spacing:.5px; }
        .lg-mini-val { font-family:'IBM Plex Mono', monospace; font-size: 13.5px; font-weight: 600; }

        .lg-table { width: 100%; border-collapse: collapse; }
        .lg-table th {
          text-align: left; font-size: 10.5px; text-transform: uppercase; letter-spacing: .6px; color: var(--ink-soft);
          font-weight: 600; padding: 6px 10px; border-bottom: 1.5px solid var(--rule-strong);
        }
        .lg-table td { padding: 8px 10px; border-bottom: 1px solid var(--rule); font-size: 13px; vertical-align: middle; }
        .lg-table tr:hover td { background: rgba(47,107,79,0.035); }
        .lg-table tr:last-child td { border-bottom: none; }
        .lg-table .num { text-align: right; font-family:'IBM Plex Mono', monospace; }
        .lg-total-row td { border-top: 2px solid var(--rule-strong); border-bottom: 3px double var(--rule-strong); font-weight: 600; }
        .lg-total-row:hover td { background: transparent; }

        .lg-input {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; border: 1px solid var(--rule-strong); border-radius: 7px;
          padding: 6px 9px; background: #fff; color: var(--ink); width: 100%; transition: border-color .15s, box-shadow .15s;
        }
        .lg-input.num { font-family:'IBM Plex Mono', monospace; text-align: right; }
        .lg-input:focus { outline: none; border-color: var(--focus); box-shadow: 0 0 0 3px rgba(47,107,79,0.15); }

        .lg-btn {
          font-family: 'IBM Plex Sans', sans-serif; font-size: 12.5px; font-weight: 500; border-radius: 8px; padding: 8px 15px;
          border: 1.2px solid var(--ink); background: linear-gradient(155deg, var(--ink), #2C5741); color: var(--paper-raised); cursor: pointer;
          display: inline-flex; align-items: center; gap: 6px; transition: transform .12s, box-shadow .12s, opacity .12s;
          box-shadow: 0 2px 6px -2px rgba(27,53,39,0.5);
        }
        .lg-btn:hover { transform: translateY(-1px); box-shadow: 0 5px 12px -4px rgba(27,53,39,0.55); }
        .lg-btn:active { transform: translateY(0); }
        .lg-btn.ghost { background: transparent; color: var(--ink); border-color: var(--rule-strong); box-shadow: none; }
        .lg-btn.danger { background: transparent; color: var(--debit); border-color: var(--debit); box-shadow: none; }
        .lg-btn.sm { padding: 5px 10px; font-size: 11.5px; }

        .lg-icon-btn { background: transparent; border: none; cursor: pointer; color: var(--ink-soft); padding: 5px; border-radius: 7px; display:flex; transition: background .15s, color .15s; }
        .lg-icon-btn:hover { background: rgba(155,59,52,0.1); color: var(--debit); }

        .lg-empty { text-align:center; padding: 34px 10px; color: var(--ink-soft); font-size: 13px; font-family: 'Fraunces', serif; font-style: italic; }

        .lg-add-row { display:flex; gap: 10px; padding: 12px 16px 16px; flex-wrap: wrap; align-items:flex-end; background: linear-gradient(180deg, rgba(47,107,79,0.05), rgba(47,107,79,0.02)); }
        .lg-field { display:flex; flex-direction:column; gap:4px; min-width: 90px; }
        .lg-field label { font-size: 10px; text-transform:uppercase; color: var(--ink-soft); letter-spacing:.5px; }
        .lg-field.grow { flex: 1; min-width: 160px; }

        .lg-bar-track { height: 5px; border-radius: 999px; background: var(--rule); overflow: hidden; display: flex; }
        .lg-bar-credit { background: var(--credit); height: 100%; }
        .lg-bar-debit { background: var(--debit); height: 100%; }

        @media (max-width: 720px) {
          .lg-body { flex-direction: column; }
          .lg-nav { width: 100%; flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1.5px solid var(--rule-strong); }
          .lg-month-figs { display: none; }
        }
      `}</style>

      <TopBar saveState={saveState} />
      <div className="lg-body">
        <Nav tab={tab} setTab={setTab} />
        <div className="lg-main">
          {tab === "dashboard" && <Dashboard data={data} year={year} setYear={setYear} />}
          {tab === "expenses" && <ExpensesTab data={data} persist={persist} year={year} setYear={setYear} />}
          {tab === "salary" && <SalaryTab data={data} persist={persist} year={year} setYear={setYear} />}
          {tab === "mf" && <MFTab data={data} persist={persist} />}
        </div>
      </div>
    </div>
  );
}

function TopBar({ saveState }) {
  return (
    <div className="lg-topbar">
      <div className="lg-brand">
        <div className="lg-brand-mark"><NotebookPen size={18} /></div>
        <div className="lg-title">
          My Ledger
          <span className="sub">Personal Cash Flow &amp; Investments</span>
        </div>
      </div>
      <div className="lg-save">
        {saveState === "saving" && <><Loader2 size={13} className="animate-spin" /> Saving…</>}
        {saveState === "saved" && <><Check size={13} /> Saved</>}
        {saveState === "idle" && <><Save size={13} /> Up to date</>}
      </div>
    </div>
  );
}

function Nav({ tab, setTab }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "expenses", label: "Monthly Ledger", icon: Wallet },
    { id: "salary", label: "Salary", icon: Landmark },
    { id: "mf", label: "Mutual Funds", icon: PiggyBank },
  ];
  return (
    <div className="lg-nav">
      {items.map((it) => (
        <div key={it.id} className={"lg-nav-item" + (tab === it.id ? " active" : "")} onClick={() => setTab(it.id)}>
          <span className="lg-nav-icon"><it.icon size={14} /></span> {it.label}
        </div>
      ))}
    </div>
  );
}

function YearSwitcher({ years, year, setYear, onAddYear }) {
  return (
    <div className="lg-year-row">
      {years.map((y) => (
        <div key={y} className={"lg-year-pill" + (y === year ? " active" : "")} onClick={() => setYear(y)}>
          {y}
        </div>
      ))}
      {onAddYear && (
        <div className="lg-year-add" onClick={onAddYear}>
          <Plus size={12} /> New year
        </div>
      )}
    </div>
  );
}

function nextFY(y) {
  const start = parseInt(y.split("-")[0], 10) + 1;
  return `${start}-${String(start + 1).slice(2)}`;
}

// Only show a year pill if that year actually has entries for this section,
// or it's the currently selected year (so a just-added empty year stays visible).
function visibleYears(years, year, hasData) {
  return years.filter((y) => hasData(y) || y === year);
}

/* ------------------------------------------------------------------ */
/* Dashboard                                                            */
/* ------------------------------------------------------------------ */
function Dashboard({ data, year, setYear }) {
  const expMonths = data.expenses[year] || [];
  const salMonths = data.salary[year] || [];
  const mfMonths = data.mf[year] || [];

  const totals = useMemo(() => {
    let credits = 0, debits = 0, expenses = 0, invest = 0, closing = null, opening = null;
    expMonths.forEach((m) => {
      const c = computeClosing(m);
      credits += c.credits; debits += c.debits;
      expenses += Number(m.expensesTotal) || 0;
      invest += Number(m.investmentsTotal) || 0;
      if (opening === null) opening = m.opening;
      closing = c.closing;
    });
    const netSalary = salMonths.reduce((s, m) => s + ((Number(m.gross)||0) - (Number(m.tax)||0) - (Number(m.ptax)||0) - (Number(m.epf)||0) - (Number(m.misc)||0)), 0);
    const mfTotal = mfMonths.reduce((s, m) => s + (Number(m.amount) || 0), 0);
    return { credits, debits, expenses, invest, closing, opening, netSalary, mfTotal };
  }, [expMonths, salMonths, mfMonths]);

  const chartData = expMonths.map((m) => {
    const c = computeClosing(m);
    return { month: m.month, balance: Math.round(c.closing), expenses: Math.round(Number(m.expensesTotal) || 0), invested: Math.round(Number(m.investmentsTotal) || 0) };
  });

  return (
    <div>
      <YearSwitcher
        years={visibleYears(data.years, year, (y) => (data.expenses[y]||[]).length > 0 || (data.salary[y]||[]).length > 0 || (data.mf[y]||[]).length > 0)}
        year={year} setYear={setYear}
      />
      <div className="lg-stat-grid">
        <div className="lg-stat" style={{ "--stat-accent": "#1B3527", "--stat-accent-soft": "#E4EFE1" }}>
          <div className="lg-stat-top">
            <div className="lg-stat-label" style={{ marginBottom: 0 }}>Closing balance</div>
            <div className="lg-stat-icon"><IndianRupee size={13} /></div>
          </div>
          <div className="lg-stat-value">{totals.closing !== null ? fmtSigned(totals.closing) : "—"}</div>
        </div>
        <div className="lg-stat" style={{ "--stat-accent": "var(--credit)", "--stat-accent-soft": "var(--credit-soft)" }}>
          <div className="lg-stat-top">
            <div className="lg-stat-label" style={{ marginBottom: 0 }}>Total credits</div>
            <div className="lg-stat-icon"><TrendingUp size={13} /></div>
          </div>
          <div className="lg-stat-value" style={{ color: "var(--credit)" }}>{fmtSigned(totals.credits)}</div>
        </div>
        <div className="lg-stat" style={{ "--stat-accent": "var(--debit)", "--stat-accent-soft": "var(--debit-soft)" }}>
          <div className="lg-stat-top">
            <div className="lg-stat-label" style={{ marginBottom: 0 }}>Total debits</div>
            <div className="lg-stat-icon"><TrendingDown size={13} /></div>
          </div>
          <div className="lg-stat-value" style={{ color: "var(--debit)" }}>{fmtSigned(totals.debits)}</div>
        </div>
        <div className="lg-stat" style={{ "--stat-accent": "#4C6656", "--stat-accent-soft": "#E7EDE4" }}>
          <div className="lg-stat-top">
            <div className="lg-stat-label" style={{ marginBottom: 0 }}>Expenses (yr)</div>
            <div className="lg-stat-icon"><Wallet size={13} /></div>
          </div>
          <div className="lg-stat-value">{fmtSigned(totals.expenses)}</div>
        </div>
        <div className="lg-stat" style={{ "--stat-accent": "var(--gold)", "--stat-accent-soft": "var(--gold-soft)" }}>
          <div className="lg-stat-top">
            <div className="lg-stat-label" style={{ marginBottom: 0 }}>Invested (yr)</div>
            <div className="lg-stat-icon"><PiggyBank size={13} /></div>
          </div>
          <div className="lg-stat-value" style={{ color: "var(--gold)" }}>{fmtSigned(totals.invest)}</div>
        </div>
        <div className="lg-stat" style={{ "--stat-accent": "#2C5741", "--stat-accent-soft": "#E4EFE1" }}>
          <div className="lg-stat-top">
            <div className="lg-stat-label" style={{ marginBottom: 0 }}>Net salary (yr)</div>
            <div className="lg-stat-icon"><Landmark size={13} /></div>
          </div>
          <div className="lg-stat-value">{fmtSigned(totals.netSalary)}</div>
        </div>
      </div>

      {chartData.length > 0 ? (
        <>
          <div className="lg-card">
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, marginBottom: 10, fontSize: 15 }}>Closing balance by month</div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2F6B4F" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2F6B4F" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#C4D3BC" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "IBM Plex Mono", fill: "#4C6656" }} axisLine={{ stroke: "#8FA98A" }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fontFamily: "IBM Plex Mono", fill: "#4C6656" }} axisLine={false} tickLine={false} width={70} tickFormatter={(v) => "₹" + fmt(v)} />
                <Tooltip formatter={(v) => "₹" + fmt(v)} contentStyle={{ fontFamily: "IBM Plex Mono", fontSize: 12, borderRadius: 8, border: "1px solid #8FA98A" }} />
                <Area type="monotone" dataKey="balance" stroke="#2F6B4F" strokeWidth={2} fill="url(#balGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="lg-card">
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, marginBottom: 10, fontSize: 15 }}>Expenses vs. Investments</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid stroke="#C4D3BC" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "IBM Plex Mono", fill: "#4C6656" }} axisLine={{ stroke: "#8FA98A" }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fontFamily: "IBM Plex Mono", fill: "#4C6656" }} axisLine={false} tickLine={false} width={70} tickFormatter={(v) => "₹" + fmt(v)} />
                <Tooltip formatter={(v) => "₹" + fmt(v)} contentStyle={{ fontFamily: "IBM Plex Mono", fontSize: 12, borderRadius: 8, border: "1px solid #8FA98A" }} />
                <Bar dataKey="expenses" fill="#9B3B34" radius={[3,3,0,0]} />
                <Bar dataKey="invested" fill="#A9782E" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="lg-empty">No expense entries for {year} yet — add a month in the Monthly Ledger tab.</div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Expenses Tab                                                        */
/* ------------------------------------------------------------------ */
function ExpensesTab({ data, persist, year, setYear }) {
  const [openMonth, setOpenMonth] = useState(null);
  const months = data.expenses[year] || [];

  const update = (updater) => {
    const next = deepClone(data);
    if (!next.expenses[year]) next.expenses[year] = [];
    updater(next.expenses[year]);
    persist(next);
  };

  const addYear = () => {
    const ny = nextFY(data.years[data.years.length - 1]);
    const next = deepClone(data);
    if (!next.years.includes(ny)) next.years.push(ny);
    if (!next.expenses[ny]) next.expenses[ny] = [];
    if (!next.salary[ny]) next.salary[ny] = [];
    if (!next.mf[ny]) next.mf[ny] = [];
    persist(next);
    setYear(ny);
  };

  const addMonth = () => {
    update((arr) => {
      const used = arr.map((m) => m.month);
      const nextMonthName = MONTHS.find((mo) => !used.includes(mo));
      if (!nextMonthName) return;
      const opening = arr.length ? computeClosing(arr[arr.length - 1]).closing : 0;
      arr.push(emptyExpenseMonth(nextMonthName, opening));
      setOpenMonth(nextMonthName);
    });
  };

  const removeMonth = (month) => {
    update((arr) => {
      const idx = arr.findIndex((m) => m.month === month);
      if (idx >= 0) arr.splice(idx, 1);
    });
  };

  const updateMonthField = (month, field, value) => {
    update((arr) => {
      const m = arr.find((mm) => mm.month === month);
      if (m) m[field] = value;
    });
  };

  const addEvent = (month, ev) => {
    update((arr) => {
      const m = arr.find((mm) => mm.month === month);
      if (m) m.events.push(ev);
    });
  };
  const removeEvent = (month, idx) => {
    update((arr) => {
      const m = arr.find((mm) => mm.month === month);
      if (m) m.events.splice(idx, 1);
    });
  };

  const usedMonths = months.map((m) => m.month);
  const canAddMonth = MONTHS.some((mo) => !usedMonths.includes(mo));

  return (
    <div>
      <YearSwitcher
        years={visibleYears(data.years, year, (y) => (data.expenses[y]||[]).length > 0)}
        year={year} setYear={setYear} onAddYear={addYear}
      />
      {months.length === 0 && <div className="lg-empty">No months added for {year} yet.</div>}
      {months.map((m) => (
        <MonthCard
          key={m.month}
          m={m}
          isOpen={openMonth === m.month}
          onToggle={() => setOpenMonth(openMonth === m.month ? null : m.month)}
          onRemove={() => removeMonth(m.month)}
          onFieldChange={(field, val) => updateMonthField(m.month, field, val)}
          onAddEvent={(ev) => addEvent(m.month, ev)}
          onRemoveEvent={(idx) => removeEvent(m.month, idx)}
        />
      ))}
      {canAddMonth && (
        <button className="lg-btn" onClick={addMonth}>
          <Plus size={14} /> Add next month
        </button>
      )}
    </div>
  );
}

function LockableField({ label, value, locked, onSet, onClear }) {
  const [draft, setDraft] = useState(value || "");

  if (locked) {
    return (
      <div className="lg-field">
        <label>{label}</label>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div className="lg-input num" style={{ background: "transparent", border: "1px solid transparent", padding: "5px 8px", flex: 1 }}>
            {fmt(value)}
          </div>
          <button className="lg-icon-btn" title="Delete & re-enter" onClick={onClear}><X size={13} /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg-field">
      <label>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input className="lg-input num" type="number" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <button className="lg-icon-btn" title="Confirm" onClick={() => onSet(Number(draft) || 0)} style={{ color: "var(--credit)" }}>
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}

function MonthCard({ m, isOpen, onToggle, onRemove, onFieldChange, onAddEvent, onRemoveEvent }) {
  const { credits, debits, closing } = computeClosing(m);
  const [form, setForm] = useState({ label: "", credit: "", debit: "", note: "" });

  const submitEvent = () => {
    if (!form.label.trim() && !form.credit && !form.debit) return;
    onAddEvent({
      label: form.label.trim() || "Entry",
      credit: Number(form.credit) || 0,
      debit: Number(form.debit) || 0,
      note: form.note.trim(),
    });
    setForm({ label: "", credit: "", debit: "", note: "" });
  };

  return (
    <div className="lg-month-block" style={{ "--month-accent": closing >= m.opening ? "var(--credit)" : "var(--debit)" }}>
      <div className="lg-month-head" onClick={onToggle}>
        <div className="lg-month-name">
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          {m.month}
        </div>
        <div className="lg-month-figs">
          <div style={{ width: 60 }}>
            <div className="lg-bar-track">
              <div className="lg-bar-credit" style={{ width: `${(credits + debits) > 0 ? (credits / (credits + debits)) * 100 : 50}%` }} />
              <div className="lg-bar-debit" style={{ width: `${(credits + debits) > 0 ? (debits / (credits + debits)) * 100 : 50}%` }} />
            </div>
          </div>
          <div className="lg-mini"><div className="lg-mini-label">Opening</div><div className="lg-mini-val">{fmtSigned(m.opening)}</div></div>
          <div className="lg-mini"><div className="lg-mini-label">Closing</div><div className="lg-mini-val" style={{color:"var(--credit)"}}>{fmtSigned(closing)}</div></div>
          <button className="lg-icon-btn" onClick={(e) => { e.stopPropagation(); onRemove(); }} title="Delete month"><Trash2 size={14} /></button>
        </div>
      </div>

      {isOpen && (
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{ display: "flex", gap: 14, marginBottom: 12, flexWrap: "wrap" }}>
            <LockableField
              label="Opening balance"
              value={m.opening}
              locked={m.openingLocked !== false}
              onSet={(v) => { onFieldChange("opening", v); onFieldChange("openingLocked", true); }}
              onClear={() => { onFieldChange("opening", 0); onFieldChange("openingLocked", false); }}
            />
            <LockableField
              label="Expenses total"
              value={m.expensesTotal}
              locked={m.expensesLocked !== false}
              onSet={(v) => { onFieldChange("expensesTotal", v); onFieldChange("expensesLocked", true); }}
              onClear={() => { onFieldChange("expensesTotal", 0); onFieldChange("expensesLocked", false); }}
            />
            <LockableField
              label="Investments total"
              value={m.investmentsTotal}
              locked={m.investmentsLocked !== false}
              onSet={(v) => { onFieldChange("investmentsTotal", v); onFieldChange("investmentsLocked", true); }}
              onClear={() => { onFieldChange("investmentsTotal", 0); onFieldChange("investmentsLocked", false); }}
            />
          </div>

          <table className="lg-table">
            <thead>
              <tr><th>Event</th><th>Note</th><th className="num">Credit</th><th className="num">Debit</th><th></th></tr>
            </thead>
            <tbody>
              {m.events.map((e, idx) => (
                <tr key={idx}>
                  <td>{e.label}</td>
                  <td style={{ color: "var(--ink-soft)", fontSize: 12 }}>{e.note}</td>
                  <td className="num" style={{ color: e.credit ? "var(--credit)" : "var(--ink-soft)" }}>{e.credit ? fmt(e.credit) : "—"}</td>
                  <td className="num" style={{ color: e.debit ? "var(--debit)" : "var(--ink-soft)" }}>{e.debit ? fmt(e.debit) : "—"}</td>
                  <td><button className="lg-icon-btn" onClick={() => onRemoveEvent(idx)}><X size={13} /></button></td>
                </tr>
              ))}
              <tr className="lg-total-row">
                <td colSpan={2}>Total</td>
                <td className="num" style={{ color: "var(--credit)" }}>{fmt(credits)}</td>
                <td className="num" style={{ color: "var(--debit)" }}>{fmt(debits)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <div className="lg-add-row">
            <div className="lg-field grow">
              <label>Event / label</label>
              <input className="lg-input" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="e.g. Salary, ATM withdrawal" />
            </div>
            <div className="lg-field">
              <label><ArrowUpCircle size={11} style={{verticalAlign:"-1px"}}/> Credit</label>
              <input className="lg-input num" type="number" value={form.credit} onChange={(e) => setForm({ ...form, credit: e.target.value })} />
            </div>
            <div className="lg-field">
              <label><ArrowDownCircle size={11} style={{verticalAlign:"-1px"}}/> Debit</label>
              <input className="lg-input num" type="number" value={form.debit} onChange={(e) => setForm({ ...form, debit: e.target.value })} />
            </div>
            <div className="lg-field grow">
              <label>Note</label>
              <input className="lg-input" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="optional" />
            </div>
            <button className="lg-btn sm" onClick={submitEvent}><Plus size={13} /> Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Salary Tab                                                          */
/* ------------------------------------------------------------------ */
function SalaryTab({ data, persist, year, setYear }) {
  const rows = data.salary[year] || [];
  const [form, setForm] = useState({ month: "", gross: "", tax: "", ptax: "", epf: "", misc: "" });

  const removeRow = (month) => {
    const next = deepClone(data);
    const idx = (next.salary[year] || []).findIndex((r) => r.month === month);
    if (idx >= 0) next.salary[year].splice(idx, 1);
    persist(next);
  };

  const addRow = () => {
    if (!form.month) return;
    const next = deepClone(data);
    if (!next.salary[year]) next.salary[year] = [];
    next.salary[year].push({
      month: form.month,
      gross: Number(form.gross) || 0,
      tax: Number(form.tax) || 0,
      ptax: Number(form.ptax) || 0,
      epf: Number(form.epf) || 0,
      misc: Number(form.misc) || 0,
    });
    persist(next);
    setForm({ month: "", gross: "", tax: "", ptax: "", epf: "", misc: "" });
  };

  const usedMonths = rows.map((r) => r.month);
  const availableMonths = MONTHS.filter((mo) => !usedMonths.includes(mo));
  const totalNet = rows.reduce((s, r) => s + ((Number(r.gross)||0)-(Number(r.tax)||0)-(Number(r.ptax)||0)-(Number(r.epf)||0)-(Number(r.misc)||0)), 0);

  return (
    <div>
      <YearSwitcher
        years={visibleYears(data.years, year, (y) => (data.salary[y]||[]).length > 0)}
        year={year} setYear={setYear}
      />
      <div className="lg-card" style={{ overflowX: "auto" }}>
        <table className="lg-table">
          <thead>
            <tr>
              <th>Month</th><th className="num">Gross</th><th className="num">Tax</th>
              <th className="num">Prof. tax</th><th className="num">EPF</th><th className="num">Misc</th>
              <th className="num">Net</th><th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const net = (Number(r.gross)||0)-(Number(r.tax)||0)-(Number(r.ptax)||0)-(Number(r.epf)||0)-(Number(r.misc)||0);
              return (
                <tr key={r.month}>
                  <td style={{ fontWeight: 600 }}>{r.month}</td>
                  <td className="num">{fmt(r.gross)}</td>
                  <td className="num">{fmt(r.tax)}</td>
                  <td className="num">{fmt(r.ptax)}</td>
                  <td className="num">{fmt(r.epf)}</td>
                  <td className="num">{fmt(r.misc)}</td>
                  <td className="num" style={{ fontWeight: 600 }}>{fmt(net)}</td>
                  <td><button className="lg-icon-btn" onClick={() => removeRow(r.month)}><Trash2 size={13} /></button></td>
                </tr>
              );
            })}
            {rows.length > 0 && (
              <tr className="lg-total-row">
                <td>Total</td><td colSpan={5}></td>
                <td className="num">{fmt(totalNet)}</td><td></td>
              </tr>
            )}
          </tbody>
        </table>
        {rows.length === 0 && <div className="lg-empty">No salary entries for {year} yet.</div>}
      </div>

      {availableMonths.length > 0 && (
        <div className="lg-card">
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, marginBottom: 10, fontSize: 15 }}>Add month</div>
          <div className="lg-add-row" style={{ padding: 0, background: "transparent" }}>
            <div className="lg-field">
              <label>Month</label>
              <select className="lg-input" value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })}>
                <option value="">Select…</option>
                {availableMonths.map((mo) => <option key={mo} value={mo}>{mo}</option>)}
              </select>
            </div>
            <div className="lg-field">
              <label>Gross</label>
              <input className="lg-input num" type="number" value={form.gross} onChange={(e) => setForm({ ...form, gross: e.target.value })} />
            </div>
            <div className="lg-field">
              <label>Tax</label>
              <input className="lg-input num" type="number" value={form.tax} onChange={(e) => setForm({ ...form, tax: e.target.value })} />
            </div>
            <div className="lg-field">
              <label>Prof. tax</label>
              <input className="lg-input num" type="number" value={form.ptax} onChange={(e) => setForm({ ...form, ptax: e.target.value })} />
            </div>
            <div className="lg-field">
              <label>EPF</label>
              <input className="lg-input num" type="number" value={form.epf} onChange={(e) => setForm({ ...form, epf: e.target.value })} />
            </div>
            <div className="lg-field">
              <label>Misc</label>
              <input className="lg-input num" type="number" value={form.misc} onChange={(e) => setForm({ ...form, misc: e.target.value })} />
            </div>
            <button className="lg-btn sm" onClick={addRow}><Plus size={13} /> Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MF Tab                                                               */
/* ------------------------------------------------------------------ */
function MFTab({ data, persist }) {
  const [form, setForm] = useState({ year: data.years[data.years.length - 1], month: "", amount: "", note: "" });

  // Flatten every year's MF rows into one list, most recent year first, chronological month order within a year.
  const allRows = useMemo(() => {
    const out = [];
    data.years.forEach((y) => {
      (data.mf[y] || []).forEach((r) => out.push({ year: y, ...r }));
    });
    out.sort((a, b) => {
      if (a.year !== b.year) return a.year < b.year ? 1 : -1;
      return MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month);
    });
    return out;
  }, [data]);

  const total = allRows.reduce((s, r) => s + (Number(r.amount) || 0), 0);

  const usedMonthsForYear = (y) => (data.mf[y] || []).map((r) => r.month);
  const availableMonths = MONTHS.filter((mo) => !usedMonthsForYear(form.year).includes(mo));

  const addYear = () => {
    const ny = nextFY(data.years[data.years.length - 1]);
    const next = deepClone(data);
    if (!next.years.includes(ny)) next.years.push(ny);
    if (!next.expenses[ny]) next.expenses[ny] = [];
    if (!next.salary[ny]) next.salary[ny] = [];
    if (!next.mf[ny]) next.mf[ny] = [];
    persist(next);
    setForm({ ...form, year: ny });
  };

  const addEntry = () => {
    if (!form.month || !form.amount) return;
    const next = deepClone(data);
    if (!next.mf[form.year]) next.mf[form.year] = [];
    next.mf[form.year].push({ month: form.month, amount: Number(form.amount) || 0, note: form.note.trim() });
    persist(next);
    setForm({ ...form, month: "", amount: "", note: "" });
  };

  const removeRow = (year, month) => {
    const next = deepClone(data);
    const idx = (next.mf[year] || []).findIndex((r) => r.month === month);
    if (idx >= 0) next.mf[year].splice(idx, 1);
    persist(next);
  };

  return (
    <div>
      <div className="lg-card">
        <table className="lg-table">
          <thead><tr><th>Year</th><th>Month</th><th className="num">Amount invested</th><th>Note</th><th></th></tr></thead>
          <tbody>
            {allRows.map((r) => (
              <tr key={r.year + r.month}>
                <td className="lg-mono" style={{ color: "var(--ink-soft)" }}>{r.year}</td>
                <td style={{ fontWeight: 600 }}>{r.month}</td>
                <td className="num">{fmt(r.amount)}</td>
                <td style={{ color: "var(--ink-soft)" }}>{r.note || "—"}</td>
                <td><button className="lg-icon-btn" onClick={() => removeRow(r.year, r.month)}><Trash2 size={13} /></button></td>
              </tr>
            ))}
            {allRows.length > 0 && (
              <tr className="lg-total-row"><td colSpan={2}>Total</td><td className="num" style={{color:"var(--gold)"}}>{fmt(total)}</td><td colSpan={2}></td></tr>
            )}
          </tbody>
        </table>
        {allRows.length === 0 && <div className="lg-empty">No MF entries yet — add one below.</div>}
      </div>

      <div className="lg-card">
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, marginBottom: 10, fontSize: 15 }}>Add investment</div>
        <div className="lg-add-row" style={{ padding: 0, background: "transparent" }}>
          <div className="lg-field">
            <label>Year</label>
            <select className="lg-input" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value, month: "" })}>
              {data.years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <button type="button" className="lg-year-add" onClick={addYear}><Plus size={12} /> New year</button>
          <div className="lg-field">
            <label>Month</label>
            <select className="lg-input" value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })}>
              <option value="">Select…</option>
              {availableMonths.map((mo) => <option key={mo} value={mo}>{mo}</option>)}
            </select>
          </div>
          <div className="lg-field">
            <label>Amount</label>
            <input className="lg-input num" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div className="lg-field grow">
            <label>Note</label>
            <input className="lg-input" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="optional" />
          </div>
          <button className="lg-btn sm" onClick={addEntry}><Plus size={13} /> Add</button>
        </div>
      </div>
    </div>
  );
}
