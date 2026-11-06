var y = en(hn()),
  k2 = ["galette", "chandeleur", "valentin", "paques", "muguet", "meres", "musique", "peres", "juillet"],
  T2 = ({ t = 18, c: c = "#D4AF37" }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 26 20", width: t, height: t * 0.77, "aria-hidden": "true" },
      y.default.createElement("path", { d: "M1 18V5l6 6 6-10 6 10 6-6v13z", fill: c }),
      y.default.createElement("path", { d: "M1 15h24", stroke: "#A8841C", strokeWidth: "1.4" }),
      y.default.createElement("circle", { cx: "13", cy: "10", r: "1.8", fill: "#C62828" }),
      y.default.createElement("circle", { cx: "6", cy: "13", r: "1.3", fill: "#1F6FB2" }),
      y.default.createElement("circle", { cx: "20", cy: "13", r: "1.3", fill: "#2E7D32" }),
    );
var hf = ({ t = 14, c: c = "#F4D774" }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 24 24", width: t, height: t, "aria-hidden": "true" },
      y.default.createElement("path", {
        d: "M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6 5.6 21.1 7 14l-5.3-5 7.2-.9z",
        fill: c,
      }),
    ),
  I2 = ({ t = 18 }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 24 16", width: t, height: t * 0.66, "aria-hidden": "true" },
      y.default.createElement("ellipse", { cx: "12", cy: "8", rx: "11", ry: "6.5", fill: "#E9B35A" }),
      y.default.createElement("ellipse", { cx: "12", cy: "7.4", rx: "9", ry: "4.8", fill: "#F2CB7C" }),
      y.default.createElement(
        "g",
        { fill: "#C98A2E", opacity: ".55" },
        y.default.createElement("circle", { cx: "8", cy: "7", r: "1.2" }),
        y.default.createElement("circle", { cx: "14", cy: "9", r: "1" }),
        y.default.createElement("circle", { cx: "16", cy: "6", r: ".9" }),
        y.default.createElement("circle", { cx: "10", cy: "10", r: ".8" }),
      ),
    ),
  mO = ({ t = 16 }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 16 26", width: t * 0.62, height: t, "aria-hidden": "true" },
      y.default.createElement("path", { d: "M8 1c3 4 3 7 0 9-3-2-3-5 0-9z", fill: "#FFB547" }),
      y.default.createElement("path", { d: "M8 4c1.4 2 1.4 4 0 5-1.4-1-1.4-3 0-5z", fill: "#FFF3C4" }),
      y.default.createElement("rect", {
        x: "4.5",
        y: "10",
        width: "7",
        height: "15",
        rx: "1.2",
        fill: "#FFF6E8",
      }),
      y.default.createElement("path", { d: "M8 10v-1", stroke: "#3B2A1E", strokeWidth: "1" }),
    ),
  Ju = ({ t = 16, c: c = "#E05A73" }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 24 22", width: t, height: t * 0.92, "aria-hidden": "true" },
      y.default.createElement("path", {
        d: "M12 21C4 15 1 11 2.5 6.5 4 2.5 9 2 12 6 15 2 20 2.5 21.5 6.5 23 11 20 15 12 21z",
        fill: c,
      }),
      y.default.createElement("ellipse", {
        cx: "7.4",
        cy: "7.4",
        rx: "2.2",
        ry: "1.5",
        fill: "#fff",
        opacity: ".45",
      }),
    ),
  Ui = ({ t = 14, c: c = "#F6C6D9", r: r = "#E05A73" }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 20 26", width: t * 0.77, height: t, "aria-hidden": "true" },
      y.default.createElement("path", {
        d: "M10 1C4.5 1 1 9 1 15.5 1 21 5 25 10 25s9-4 9-9.5C19 9 15.5 1 10 1z",
        fill: c,
      }),
      y.default.createElement("path", {
        d: "M1.6 12.5q2.8-2.4 5.6 0t5.6 0 5.6 0",
        stroke: r,
        strokeWidth: "1.6",
        fill: "none",
      }),
      y.default.createElement(
        "g",
        { fill: r },
        y.default.createElement("circle", { cx: "6", cy: "18", r: "1.3" }),
        y.default.createElement("circle", { cx: "10", cy: "19.5", r: "1.3" }),
        y.default.createElement("circle", { cx: "14", cy: "18", r: "1.3" }),
      ),
      y.default.createElement("ellipse", {
        cx: "6.5",
        cy: "7",
        rx: "1.8",
        ry: "2.6",
        fill: "#fff",
        opacity: ".45",
      }),
    ),
  qi = ({ t = 14, c: c = "#F48FB1", m: m = "#FFD54F" }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 24 24", width: t, height: t, "aria-hidden": "true" },
      [0, 72, 144, 216, 288].map((r) =>
        y.default.createElement("ellipse", {
          key: r,
          cx: "12",
          cy: "6",
          rx: "4.2",
          ry: "5.6",
          fill: c,
          transform: `rotate(${r} 12 12)`,
        }),
      ),
      y.default.createElement("circle", { cx: "12", cy: "12", r: "3.4", fill: m }),
    ),
  Ru = ({ t = 18 }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 24 30", width: t * 0.8, height: t, "aria-hidden": "true" },
      y.default.createElement("path", { d: "M7 29C3 20 4 9 10 3c-1 9 0 17 2 26z", fill: "#5E9A3E" }),
      y.default.createElement("path", {
        d: "M13 29c1-9 3-16 8-22",
        stroke: "#4E7F2E",
        strokeWidth: "1.3",
        fill: "none",
      }),
      [
        [19, 9],
        [17, 13],
        [15.4, 17.4],
        [14.4, 22],
      ].map(([e, n], r) =>
        y.default.createElement(
          "g",
          { key: r },
          y.default.createElement("path", {
            d: `M${e} ${n}q1.6 0 2 2`,
            stroke: "#4E7F2E",
            strokeWidth: ".8",
            fill: "none",
          }),
          y.default.createElement("path", {
            d: `M${e + 0.4} ${n + 2}a2.6 2.6 0 0 1 5.2 0l-.6 2.2h-4z`,
            fill: "#FFFFFF",
            stroke: "#DDE8D2",
            strokeWidth: ".5",
          }),
        ),
      ),
    ),
  Xu = ({ t = 16, c: c = "#F2B134", d: d }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 24 24", width: t, height: t, "aria-hidden": "true" },
      d
        ? y.default.createElement(
            y.default.Fragment,
            null,
            y.default.createElement("path", {
              d: "M8 18V5l12-3v13",
              stroke: c,
              strokeWidth: "2.2",
              fill: "none",
            }),
            y.default.createElement("path", { d: "M8 5l12-3v3.4L8 8.4z", fill: c }),
            y.default.createElement("ellipse", { cx: "5.4", cy: "18.6", rx: "3.4", ry: "2.6", fill: c }),
            y.default.createElement("ellipse", { cx: "17.4", cy: "15.6", rx: "3.4", ry: "2.6", fill: c }),
          )
        : y.default.createElement(
            y.default.Fragment,
            null,
            y.default.createElement("path", {
              d: "M14 18V2c2 3 6 4 6 9",
              stroke: c,
              strokeWidth: "2.2",
              fill: "none",
              strokeLinecap: "round",
            }),
            y.default.createElement("ellipse", { cx: "10.4", cy: "18.6", rx: "4", ry: "3", fill: c }),
          ),
    ),
  gO = ({ t = 16, c: c = "#24507E" }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 16 28", width: t * 0.57, height: t, "aria-hidden": "true" },
      y.default.createElement("path", { d: "M4 1h8l-2 5H6z", fill: c }),
      y.default.createElement("path", { d: "M6 6h4l4 14-6 7-6-7z", fill: c }),
      y.default.createElement("path", {
        d: "M5 11l7 3M4 16l8 3",
        stroke: "#fff",
        strokeWidth: "1.2",
        opacity: ".55",
      }),
    ),
  vO = ({ t = 18, c: c = "#4E342E" }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 30 12", width: t, height: t * 0.4, "aria-hidden": "true" },
      y.default.createElement("path", {
        d: "M15 4c-3-3-7-3-10 0-2 2-3 2-5 1 1 4 5 6 9 5 3-1 5-3 6-4 1 1 3 3 6 4 4 1 8-1 9-5-2 1-3 1-5-1-3-3-7-3-10 0z",
        fill: c,
      }),
    ),
  uC = ({ t = 13, c: c = "#1F3A93" }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 16 18", width: t * 0.9, height: t, "aria-hidden": "true" },
      y.default.createElement("path", {
        d: "M1 1h14L8 17z",
        fill: c,
        stroke: c === "#FFFFFF" ? "#C8D0E8" : "none",
        strokeWidth: ".8",
      }),
    ),
  yO = ({ t = 18 }) =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 24 24", width: t, height: t, "aria-hidden": "true" },
      y.default.createElement("circle", { cx: "12", cy: "12", r: "11", fill: "#D7263D" }),
      y.default.createElement("circle", { cx: "12", cy: "12", r: "7.5", fill: "#FFFFFF" }),
      y.default.createElement("circle", { cx: "12", cy: "12", r: "4", fill: "#1F3A93" }),
    ),
  wO = () =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 70 60", width: "62", height: "54", "aria-hidden": "true" },
      y.default.createElement(
        "g",
        { fill: "#F3ECE2" },
        y.default.createElement("ellipse", { cx: "32", cy: "40", rx: "20", ry: "14" }),
        y.default.createElement("circle", { cx: "54", cy: "30", r: "10" }),
        y.default.createElement("path", {
          d: "M50 22c-2-10 0-18 4-20 3 3 2 12-1 20zM56 22c1-10 6-16 10-16 1 4-3 12-7 17z",
        }),
        y.default.createElement("circle", { cx: "12", cy: "38", r: "6", fill: "#FFFFFF" }),
        y.default.createElement("ellipse", { cx: "40", cy: "53", rx: "9", ry: "4" }),
        y.default.createElement("ellipse", { cx: "22", cy: "53", rx: "7", ry: "3.6" }),
      ),
      y.default.createElement("path", {
        d: "M52 8c1 4 1 9 0 13M60 10c-1 4-2 8-4 11",
        stroke: "#F4B6C8",
        strokeWidth: "2.2",
        strokeLinecap: "round",
      }),
      y.default.createElement("circle", { cx: "57", cy: "28", r: "1.6", fill: "#3B2A1E" }),
      y.default.createElement("circle", { cx: "63", cy: "32", r: "1.4", fill: "#E88AAE" }),
      y.default.createElement(
        "g",
        { transform: "translate(26 22) rotate(-10)" },
        y.default.createElement("path", {
          d: "M6 0C2.6 0 0 5 0 9s2.6 7 6 7 6-3 6-7-2.6-9-6-9z",
          fill: "#F9E79F",
        }),
        y.default.createElement("path", {
          d: "M0.4 7q1.4-1.4 2.8 0t2.8 0 2.8 0 2.8 0",
          stroke: "#E05A73",
          strokeWidth: "1.2",
          fill: "none",
        }),
      ),
    ),
  bO = () =>
    y.default.createElement(
      "svg",
      { viewBox: "0 0 100 64", width: "96", height: "62", "aria-hidden": "true" },
      y.default.createElement("rect", {
        x: "34",
        y: "14",
        width: "26",
        height: "24",
        rx: "2",
        fill: "#C62828",
      }),
      y.default.createElement("rect", { x: "38", y: "18", width: "18", height: "12", fill: "#BFE3F2" }),
      y.default.createElement("path", { d: "M10 30h52v14H14z", fill: "#D7372E" }),
      y.default.createElement("rect", {
        x: "60",
        y: "28",
        width: "24",
        height: "16",
        rx: "3",
        fill: "#D7372E",
      }),
      y.default.createElement("rect", { x: "70", y: "18", width: "4", height: "12", fill: "#3B2A1E" }),
      y.default.createElement("circle", { cx: "28", cy: "46", r: "15", fill: "#2E2A2C" }),
      y.default.createElement("circle", { cx: "28", cy: "46", r: "7", fill: "#E9B949" }),
      y.default.createElement("circle", { cx: "78", cy: "50", r: "10", fill: "#2E2A2C" }),
      y.default.createElement("circle", { cx: "78", cy: "50", r: "4.6", fill: "#E9B949" }),
      y.default.createElement(
        "g",
        { className: "amb3-fumee" },
        y.default.createElement("circle", { cx: "72", cy: "12", r: "3.5", fill: "#fff", opacity: ".7" }),
        y.default.createElement("circle", { cx: "76", cy: "5", r: "2.6", fill: "#fff", opacity: ".5" }),
      ),
    ),
  jr = ({ v: v, back: back, front: front }) =>
    y.default.createElement(
      "svg",
      {
        className: "amb-village",
        viewBox: "0 0 400 150",
        preserveAspectRatio: "xMidYMax slice",
        "aria-hidden": "true",
      },
      back,
      y.default.createElement("path", { d: "M0 94Q70 72 150 86t250-6V150H0z", fill: v.fond, opacity: ".6" }),
      y.default.createElement("path", { d: "M0 110Q100 98 200 106t200-4V150H0z", fill: v.sol[0] }),
      y.default.createElement("path", { d: "M0 124Q120 114 220 121t180-6V150H0z", fill: v.sol[1] }),
      front,
    ),
  Zu = ({ x: x, y: e, h: h, c: c = "#2E5A2E", tronc: tronc = "#4A3222" }) =>
    y.default.createElement(
      "g",
      null,
      y.default.createElement("rect", {
        x: x - h * 0.05,
        y: e - h * 0.45,
        width: h * 0.1,
        height: h * 0.45,
        fill: tronc,
      }),
      y.default.createElement("circle", { cx: x, cy: e - h * 0.62, r: h * 0.3, fill: c }),
      y.default.createElement("circle", { cx: x - h * 0.2, cy: e - h * 0.5, r: h * 0.22, fill: c }),
      y.default.createElement("circle", { cx: x + h * 0.2, cy: e - h * 0.52, r: h * 0.22, fill: c }),
    ),
  EO = ({ x: x, y: e, c: c = "#3E7A2E" }) =>
    y.default.createElement("path", {
      d: `M${x} ${e}l-3-7M${x} ${e}l0-9M${x} ${e}l3-7`,
      stroke: c,
      strokeWidth: "1.3",
      strokeLinecap: "round",
    }),
  xO = {
    galette: (t) =>
      y.default.createElement(jr, {
        v: t,
        front: y.default.createElement(
          y.default.Fragment,
          null,
          y.default.createElement(
            "g",
            { className: "amb-lueur" },
            y.default.createElement("circle", { cx: "268", cy: "70", r: "2", fill: "#FFF3C4" }),
            y.default.createElement("circle", { cx: "140", cy: "80", r: "1.6", fill: "#FFF3C4" }),
          ),
          y.default.createElement("ellipse", {
            cx: "200",
            cy: "122",
            rx: "22",
            ry: "3.4",
            fill: "#000",
            opacity: ".25",
          }),
          y.default.createElement("path", { d: "M194 122h12l-2-8h-8z", fill: "#E9E1CF" }),
          y.default.createElement("ellipse", { cx: "200", cy: "113", rx: "40", ry: "6", fill: "#F4F0E6" }),
          y.default.createElement("ellipse", { cx: "200", cy: "107", rx: "34", ry: "9", fill: "#B87622" }),
          y.default.createElement("ellipse", { cx: "200", cy: "104", rx: "34", ry: "9", fill: "#E3A644" }),
          y.default.createElement(
            "g",
            { stroke: "#B87622", strokeWidth: "1", fill: "none", opacity: ".8" },
            [-22, -11, 0, 11, 22].map((e) =>
              y.default.createElement("path", { key: e, d: `M${200 + e - 9} 97.5q9 6.5 18 13` }),
            ),
          ),
          y.default.createElement("path", { d: "M200 104l26-6-1 7z", fill: "#F7DDA0" }),
          y.default.createElement(
            "g",
            { transform: "translate(244 98)" },
            y.default.createElement("path", { d: "M0 22V6l7 7 7-12 7 12 7-7v16z", fill: "#E9C46A" }),
            y.default.createElement("path", { d: "M0 18h28", stroke: "#A8841C", strokeWidth: "1.6" }),
            y.default.createElement("circle", { cx: "14", cy: "11", r: "2.2", fill: "#C62828" }),
            y.default.createElement("circle", { cx: "6", cy: "15", r: "1.6", fill: "#1F6FB2" }),
            y.default.createElement("circle", { cx: "22", cy: "15", r: "1.6", fill: "#2E7D32" }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(140 104)" },
            y.default.createElement("path", { d: "M0 0h14q0 14-7 14T0 0z", fill: "#F2C14E", opacity: ".9" }),
            y.default.createElement("path", {
              d: "M0 0h14",
              stroke: "#fff",
              strokeWidth: "1.4",
              opacity: ".6",
            }),
            y.default.createElement("rect", { x: "5", y: "14", width: "4", height: "4", fill: "#E9E1CF" }),
          ),
        ),
      }),
    chandeleur: (t) =>
      y.default.createElement(jr, {
        v: t,
        front: y.default.createElement(
          y.default.Fragment,
          null,
          y.default.createElement(
            "g",
            { transform: "translate(124 84)" },
            y.default.createElement("rect", {
              x: "0",
              y: "12",
              width: "9",
              height: "26",
              rx: "1.4",
              fill: "#FFF6E8",
            }),
            y.default.createElement("path", {
              d: "M4.5 0c4 5 4 9 0 12-4-3-4-7 0-12z",
              fill: "#FFB547",
              className: "amb-lueur",
            }),
            y.default.createElement("circle", {
              cx: "4.5",
              cy: "7",
              r: "12",
              fill: "#FFD36B",
              opacity: ".18",
            }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(150 106)" },
            y.default.createElement("ellipse", { cx: "26", cy: "6", rx: "26", ry: "6", fill: "#2E2A2C" }),
            y.default.createElement("ellipse", { cx: "26", cy: "4.6", rx: "22", ry: "4", fill: "#4A4648" }),
            y.default.createElement("path", {
              d: "M50 4l26-6",
              stroke: "#5A3418",
              strokeWidth: "4.4",
              strokeLinecap: "round",
            }),
          ),
          y.default.createElement(
            "g",
            { className: "amb3-saute" },
            y.default.createElement(
              "g",
              { transform: "translate(160 66)" },
              y.default.createElement("ellipse", { cx: "16", cy: "6", rx: "16", ry: "5", fill: "#E9B35A" }),
              y.default.createElement("ellipse", {
                cx: "16",
                cy: "5.4",
                rx: "13",
                ry: "3.6",
                fill: "#F2CB7C",
              }),
              y.default.createElement("circle", {
                cx: "12",
                cy: "5",
                r: "1.2",
                fill: "#C98A2E",
                opacity: ".6",
              }),
              y.default.createElement("circle", {
                cx: "20",
                cy: "6",
                r: "1",
                fill: "#C98A2E",
                opacity: ".6",
              }),
            ),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(236 100)" },
            y.default.createElement("path", { d: "M0 4h34q-2 16-17 16T0 4z", fill: "#F4F0E6" }),
            y.default.createElement("ellipse", { cx: "17", cy: "4", rx: "17", ry: "3.4", fill: "#F6E2B4" }),
            y.default.createElement("path", {
              d: "M22 4l8-16",
              stroke: "#C9A06A",
              strokeWidth: "2",
              strokeLinecap: "round",
            }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(278 98)" },
            y.default.createElement("rect", {
              x: "0",
              y: "6",
              width: "18",
              height: "18",
              rx: "3",
              fill: "#C62828",
            }),
            y.default.createElement("rect", {
              x: "-1",
              y: "2",
              width: "20",
              height: "6",
              rx: "1",
              fill: "#F4F0E6",
            }),
            y.default.createElement("path", {
              d: "M-1 5h20",
              stroke: "#C62828",
              strokeWidth: "1.4",
              strokeDasharray: "2 2",
            }),
            y.default.createElement("rect", { x: "3", y: "12", width: "12", height: "7", fill: "#FFF6E8" }),
          ),
        ),
      }),
    valentin: (t) =>
      y.default.createElement(jr, {
        v: t,
        back: y.default.createElement(Zu, { x: 262, y: 96, h: 70, c: "#B83A5E", tronc: "#3E1024" }),
        front: y.default.createElement(
          y.default.Fragment,
          null,
          y.default.createElement(
            "g",
            { transform: "translate(132 58)" },
            y.default.createElement("rect", { x: "3", y: "10", width: "3", height: "60", fill: "#2A0E1C" }),
            y.default.createElement("path", { d: "M-3 10h15l-3-9h-9z", fill: "#2A0E1C" }),
            y.default.createElement("circle", {
              cx: "4.5",
              cy: "12",
              r: "14",
              fill: "#FFD9A8",
              opacity: ".25",
              className: "amb-lueur",
            }),
            y.default.createElement("rect", { x: "1", y: "8", width: "7", height: "4", fill: "#FFE3B0" }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(172 100)" },
            y.default.createElement("rect", {
              x: "0",
              y: "0",
              width: "58",
              height: "4",
              rx: "1",
              fill: "#5A2A1A",
            }),
            y.default.createElement("rect", {
              x: "0",
              y: "7",
              width: "58",
              height: "4",
              rx: "1",
              fill: "#5A2A1A",
            }),
            y.default.createElement("rect", {
              x: "-2",
              y: "13",
              width: "62",
              height: "4",
              rx: "1",
              fill: "#6A3420",
            }),
            y.default.createElement("path", {
              d: "M4 17v8M54 17v8M6 0v13M52 0v13",
              stroke: "#2A0E1C",
              strokeWidth: "2.4",
            }),
          ),
          y.default.createElement(
            "g",
            { className: "amb3-balance" },
            y.default.createElement("path", {
              d: "M222 100q-4-20 2-38M216 100q-8-16-10-30",
              stroke: "#F6E8EE",
              strokeWidth: ".8",
              fill: "none",
            }),
            y.default.createElement(
              "g",
              { transform: "translate(212 42)" },
              y.default.createElement("path", {
                d: "M12 21C4 15 1 11 2.5 6.5 4 2.5 9 2 12 6 15 2 20 2.5 21.5 6.5 23 11 20 15 12 21z",
                fill: "#E0284A",
              }),
              y.default.createElement("ellipse", {
                cx: "7.4",
                cy: "7.4",
                rx: "2.2",
                ry: "1.5",
                fill: "#fff",
                opacity: ".45",
              }),
            ),
            y.default.createElement(
              "g",
              { transform: "translate(196 54) scale(.8)" },
              y.default.createElement("path", {
                d: "M12 21C4 15 1 11 2.5 6.5 4 2.5 9 2 12 6 15 2 20 2.5 21.5 6.5 23 11 20 15 12 21z",
                fill: "#F48FB1",
              }),
              y.default.createElement("ellipse", {
                cx: "7.4",
                cy: "7.4",
                rx: "2.2",
                ry: "1.5",
                fill: "#fff",
                opacity: ".45",
              }),
            ),
          ),
        ),
      }),
    paques: (t) =>
      y.default.createElement(jr, {
        v: t,
        back: y.default.createElement(
          "g",
          { className: "amb3-flotte" },
          y.default.createElement(
            "g",
            { transform: "translate(236 56) scale(.85)" },
            y.default.createElement("path", {
              d: "M-12 8q-10-6-16 2 8 0 14 4zM36 8q10-6 16 2-8 0-14 4z",
              fill: "#F6C6D9",
            }),
            y.default.createElement("path", {
              d: "M12 0c-8 0-12 7-12 16l-3 8h30l-3-8c0-9-4-16-12-16z",
              fill: "#E9B949",
            }),
            y.default.createElement("circle", { cx: "12", cy: "26", r: "3", fill: "#B8860B" }),
            y.default.createElement("path", { d: "M3 18h18", stroke: "#FFF3C4", strokeWidth: "1.6" }),
            y.default.createElement("path", { d: "M12 0v-4", stroke: "#E05A73", strokeWidth: "2" }),
            y.default.createElement("path", {
              d: "M8 -6q4 4 8 0",
              stroke: "#E05A73",
              strokeWidth: "2",
              fill: "none",
            }),
          ),
        ),
        front: y.default.createElement(
          y.default.Fragment,
          null,
          [110, 130, 160, 250, 276, 296].map((e, n) =>
            y.default.createElement(EO, { key: n, x: e, y: 120 - (n % 2) * 3, c: "#2E6A2E" }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(178 96)" },
            y.default.createElement("path", { d: "M2 10h40l-5 18H7z", fill: "#B5803E" }),
            y.default.createElement("path", { d: "M2 10h40", stroke: "#8A5A26", strokeWidth: "2.4" }),
            y.default.createElement("path", {
              d: "M5 16h34M6 22h32",
              stroke: "#8A5A26",
              strokeWidth: "1",
              opacity: ".7",
            }),
            y.default.createElement("path", {
              d: "M6 10q16-26 32 0",
              stroke: "#8A5A26",
              strokeWidth: "2.4",
              fill: "none",
            }),
            y.default.createElement(
              "g",
              { transform: "translate(8 -2)" },
              y.default.createElement(Ui, { t: 14, c: "#BFE3F2", r: "#1F6FB2" }),
            ),
            y.default.createElement(
              "g",
              { transform: "translate(18 -5)" },
              y.default.createElement(Ui, { t: 15, c: "#F9E79F", r: "#E9A23B" }),
            ),
            y.default.createElement(
              "g",
              { transform: "translate(28 -1)" },
              y.default.createElement(Ui, { t: 13, c: "#F6C6D9", r: "#E05A73" }),
            ),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(140 106)" },
            y.default.createElement(Ui, { t: 14, c: "#C8E6C9", r: "#2E7D32" }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(252 110)" },
            y.default.createElement(Ui, { t: 12, c: "#F6C6D9", r: "#E05A73" }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(282 104)" },
            y.default.createElement(Ui, { t: 14, c: "#F9E79F", r: "#C97A2A" }),
          ),
          [
            [118, 112, "#F9E79F"],
            [268, 118, "#FFFFFF"],
            [232, 120, "#F48FB1"],
          ].map(([e, n, r], i) =>
            y.default.createElement(
              "g",
              { key: i, transform: `translate(${e} ${n})` },
              y.default.createElement(qi, { t: 8, c: r, m: "#E9A23B" }),
            ),
          ),
        ),
      }),
    muguet: (t) =>
      y.default.createElement(jr, {
        v: t,
        back: y.default.createElement(
          y.default.Fragment,
          null,
          y.default.createElement(Zu, { x: 118, y: 98, h: 60, c: "#2E5A2E" }),
          y.default.createElement(Zu, { x: 292, y: 96, h: 66, c: "#28502A" }),
        ),
        front: y.default.createElement(
          y.default.Fragment,
          null,
          [
            [150, 98, 0.9],
            [196, 90, 1.25],
            [244, 98, 1],
          ].map(([e, n, r], i) =>
            y.default.createElement(
              "g",
              { key: i, transform: `translate(${e} ${n}) scale(${r})` },
              y.default.createElement("path", { d: "M8 30C2 20 3 8 10 0c-1 10 0 20 3 30z", fill: "#4E8A36" }),
              y.default.createElement("path", {
                d: "M14 30C14 18 18 8 26 2c-3 10-5 18-6 28z",
                fill: "#5E9A3E",
              }),
              y.default.createElement("path", {
                d: "M12 30c0-12 2-20 6-26",
                stroke: "#3E6A2A",
                strokeWidth: "1.2",
                fill: "none",
              }),
              [
                [17, 6],
                [15.6, 11],
                [14.2, 16],
                [13.2, 21],
              ].map(([s, o], a) =>
                y.default.createElement(
                  "g",
                  {
                    key: a,
                    className: "amb3-clochette",
                    style: { animationDelay: (i + a) * 0.3 + "s", transformOrigin: `${s}px ${o}px` },
                  },
                  y.default.createElement("path", {
                    d: `M${s} ${o}q2 0 2.4 2.4`,
                    stroke: "#3E6A2A",
                    strokeWidth: ".8",
                    fill: "none",
                  }),
                  y.default.createElement("path", {
                    d: `M${s + 0.6} ${o + 2.4}a2.8 2.8 0 0 1 5.6 0l-.6 2.4h-4.4z`,
                    fill: "#FFFFFF",
                  }),
                ),
              ),
            ),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(270 104)" },
            y.default.createElement("path", { d: "M0 0h20l-3 16H3z", fill: "#C9763E" }),
            y.default.createElement("rect", {
              x: "-1",
              y: "-2",
              width: "22",
              height: "4",
              rx: "1",
              fill: "#B5652E",
            }),
            y.default.createElement("path", { d: "M2 6h16", stroke: "#E0284A", strokeWidth: "2.4" }),
            y.default.createElement("path", {
              d: "M10 6l-4 6M10 6l4 6",
              stroke: "#E0284A",
              strokeWidth: "1.6",
            }),
            y.default.createElement(
              "g",
              { transform: "translate(2 -24) scale(.7)" },
              y.default.createElement(Ru, { t: 30 }),
            ),
          ),
        ),
      }),
    meres: (t) =>
      y.default.createElement(jr, {
        v: t,
        back: y.default.createElement(Zu, { x: 290, y: 100, h: 58, c: "#5E9A4E" }),
        front: y.default.createElement(
          y.default.Fragment,
          null,
          [
            [112, 116, "#F48FB1"],
            [126, 120, "#CE93D8"],
            [276, 118, "#FFD54F"],
            [292, 121, "#F48FB1"],
            [306, 116, "#FFFFFF"],
          ].map(([e, n, r], i) =>
            y.default.createElement(
              "g",
              { key: i },
              y.default.createElement("path", {
                d: `M${e + 5} ${n + 10}v-6`,
                stroke: "#3E7A2E",
                strokeWidth: "1.2",
              }),
              y.default.createElement(
                "g",
                { transform: `translate(${e} ${n - 4})` },
                y.default.createElement(qi, { t: 10, c: r }),
              ),
            ),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(184 52)" },
            y.default.createElement("path", { d: "M14 46h20l-3 26H17z", fill: "#9CC0E6" }),
            y.default.createElement("path", { d: "M14 46h20", stroke: "#7AA0C8", strokeWidth: "2" }),
            y.default.createElement("path", {
              d: "M20 58q4 3 8 0",
              stroke: "#fff",
              strokeWidth: "1.2",
              fill: "none",
              opacity: ".7",
            }),
            y.default.createElement(
              "g",
              { stroke: "#3E7A2E", strokeWidth: "1.4", fill: "none" },
              y.default.createElement("path", {
                d: "M24 46l-14-26M24 46l0-30M24 46l14-26M24 46l-6-20M24 46l8-18",
              }),
            ),
            y.default.createElement("path", {
              d: "M16 38c-6-2-10-8-8-12 4 2 7 6 8 12zM32 38c6-2 10-8 8-12-4 2-7 6-8 12z",
              fill: "#5E9A3E",
            }),
            [
              [2, 10, "#F48FB1", 16],
              [16, 2, "#E05A73", 18],
              [32, 10, "#CE93D8", 16],
              [10, 18, "#FFD54F", 12],
              [26, 16, "#F8BBD0", 13],
            ].map(([e, n, r, i], s) =>
              y.default.createElement(
                "g",
                { key: s, transform: `translate(${e - i / 2 + 2} ${n - i / 2 + 4})` },
                y.default.createElement(qi, { t: i, c: r, m: r === "#FFD54F" ? "#E9A23B" : "#FFD54F" }),
              ),
            ),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(130 100)" },
            y.default.createElement("path", { d: "M6 4h22v18H6z", fill: "#7AA0C8" }),
            y.default.createElement("path", {
              d: "M28 8l14-10",
              stroke: "#7AA0C8",
              strokeWidth: "3.4",
              strokeLinecap: "round",
            }),
            y.default.createElement("path", {
              d: "M6 8q-8 0-6 8",
              stroke: "#5E86B0",
              strokeWidth: "2.4",
              fill: "none",
            }),
            y.default.createElement("path", {
              d: "M10 4q7-8 14 0",
              stroke: "#5E86B0",
              strokeWidth: "2.4",
              fill: "none",
            }),
          ),
        ),
      }),
    musique: (t) =>
      y.default.createElement(jr, {
        v: t,
        front: y.default.createElement(
          y.default.Fragment,
          null,
          y.default.createElement("path", {
            d: "M100 50Q150 74 200 58T300 54",
            stroke: "#1E1638",
            strokeWidth: "1",
            fill: "none",
          }),
          [110, 126, 142, 158, 174, 190, 206, 222, 238, 254, 270, 286].map((e, n) => {
            let r =
              e < 200
                ? 50 + Math.sin(((e - 100) / 100) * Math.PI) * 15
                : 58 - Math.sin(((e - 200) / 100) * Math.PI) * 6 - (e - 200) * 0.04;
            return y.default.createElement(
              "g",
              { key: n },
              y.default.createElement("circle", {
                cx: e,
                cy: r + 4,
                r: "3",
                fill: ["#F2B134", "#E05A73", "#81D4FA", "#F4D774"][n % 4],
                className: "amb-lueur",
                style: { animationDelay: n * 0.25 + "s" },
              }),
              y.default.createElement("circle", {
                cx: e,
                cy: r + 4,
                r: "7",
                fill: ["#F2B134", "#E05A73", "#81D4FA", "#F4D774"][n % 4],
                opacity: ".18",
              }),
            );
          }),
          y.default.createElement(
            "g",
            { transform: "translate(140 92)" },
            y.default.createElement("rect", {
              x: "0",
              y: "6",
              width: "26",
              height: "24",
              rx: "2",
              fill: "#2E2250",
            }),
            y.default.createElement("circle", { cx: "13", cy: "18", r: "7", fill: "#1E1638" }),
            y.default.createElement("circle", { cx: "13", cy: "18", r: "3", fill: "#4F3A8C" }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(168 64) rotate(14)" },
            y.default.createElement("rect", { x: "9", y: "0", width: "4", height: "34", fill: "#5A3418" }),
            y.default.createElement("rect", {
              x: "7",
              y: "-6",
              width: "8",
              height: "8",
              rx: "1.4",
              fill: "#3B2A1E",
            }),
            y.default.createElement("path", {
              d: "M11 32c-9 0-11 6-9 11-3 4-2 13 9 13s12-9 9-13c2-5 0-11-9-11z",
              fill: "#E08A2E",
            }),
            y.default.createElement("circle", { cx: "11", cy: "44", r: "3.4", fill: "#3B2A1E" }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(224 96)" },
            y.default.createElement("ellipse", { cx: "18", cy: "4", rx: "18", ry: "5", fill: "#F4F0E6" }),
            y.default.createElement("path", { d: "M0 4v18q18 8 36 0V4", fill: "#D7263D" }),
            y.default.createElement("path", {
              d: "M0 4l9 20 9-20 9 20 9-20",
              stroke: "#F2B134",
              strokeWidth: "1.4",
              fill: "none",
            }),
            y.default.createElement("path", {
              d: "M30-8l-8 12M34-6l-14 10",
              stroke: "#C9A06A",
              strokeWidth: "1.6",
              strokeLinecap: "round",
            }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(278 70)" },
            y.default.createElement("path", { d: "M6 6v46M0 52h12", stroke: "#1E1638", strokeWidth: "2.4" }),
            y.default.createElement("rect", {
              x: "2",
              y: "-2",
              width: "8",
              height: "12",
              rx: "4",
              fill: "#9A92B4",
            }),
          ),
        ),
      }),
    peres: (t) =>
      y.default.createElement(jr, {
        v: t,
        back: y.default.createElement(Zu, { x: 116, y: 98, h: 64, c: "#3E7A3A" }),
        front: y.default.createElement(
          y.default.Fragment,
          null,
          y.default.createElement(
            "g",
            { transform: "translate(150 84)" },
            y.default.createElement(
              "g",
              { className: "amb3-fumee" },
              y.default.createElement("path", {
                d: "M14 0q-5-8 0-14t0-14M24 -2q-5-8 0-14",
                stroke: "#FFFFFF",
                strokeWidth: "2.4",
                fill: "none",
                opacity: ".6",
                strokeLinecap: "round",
              }),
            ),
            y.default.createElement("path", { d: "M0 8h38q-2 14-19 14T0 8z", fill: "#2E2A2C" }),
            y.default.createElement("rect", {
              x: "-2",
              y: "5",
              width: "42",
              height: "4",
              rx: "2",
              fill: "#5A5658",
            }),
            y.default.createElement("path", {
              d: "M8 5l-2-4M18 5v-4M28 5l2-4",
              stroke: "#C62828",
              strokeWidth: "3",
              strokeLinecap: "round",
            }),
            y.default.createElement("path", {
              d: "M10 22l-6 16M28 22l6 16M19 22v16",
              stroke: "#2E2A2C",
              strokeWidth: "2",
            }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(206 86)" },
            y.default.createElement("path", {
              d: "M0 34L14 0M34 34L26 8",
              stroke: "#8A5A26",
              strokeWidth: "2.4",
            }),
            y.default.createElement("path", { d: "M14 0l22 26-8 4L8 6z", fill: "#5B8FC7" }),
            y.default.createElement("path", {
              d: "M17 4l20 23M11 3l21 25",
              stroke: "#FFFFFF",
              strokeWidth: "2",
              opacity: ".85",
            }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(260 102)" },
            y.default.createElement("rect", { x: "0", y: "6", width: "34", height: "14", fill: "#C9A06A" }),
            y.default.createElement("path", { d: "M0 12h34", stroke: "#A8804A", strokeWidth: "1" }),
            [3, 11, 19, 27].map((e) =>
              y.default.createElement(
                "g",
                { key: e },
                y.default.createElement("path", {
                  d: `M${e} 6v-8q0-3 2-5v-4h2v4q2 2 2 5v8z`,
                  fill: "#6A3A12",
                }),
                y.default.createElement("rect", {
                  x: e + 1.4,
                  y: "-1",
                  width: "3.2",
                  height: "4",
                  fill: "#F2D08A",
                }),
              ),
            ),
          ),
        ),
      }),
    juillet: (t) =>
      y.default.createElement(jr, {
        v: t,
        front: y.default.createElement(
          y.default.Fragment,
          null,
          y.default.createElement("path", {
            d: "M100 46Q200 70 300 46",
            stroke: "#0E1434",
            strokeWidth: "1",
            fill: "none",
          }),
          [112, 132, 152, 172, 192, 212, 232, 252, 272, 292].map((e, n) => {
            let r = 46 + (1 - Math.pow((e - 200) / 100, 2)) * 12,
              i = ["#1F3A93", "#FFFFFF", "#D7263D"][n % 3];
            return y.default.createElement(
              "g",
              { key: n, className: "amb-lueur", style: { animationDelay: n * 0.3 + "s" } },
              y.default.createElement("path", { d: `M${e} ${r}v3`, stroke: "#0E1434", strokeWidth: "1" }),
              y.default.createElement("ellipse", { cx: e, cy: r + 9, rx: "5.6", ry: "6.4", fill: i }),
              y.default.createElement("path", {
                d: `M${e - 5.6} ${r + 9}h11.2`,
                stroke: "#F2B134",
                strokeWidth: ".8",
                opacity: ".7",
              }),
              y.default.createElement("circle", {
                cx: e,
                cy: r + 9,
                r: "10",
                fill: "#FFD36B",
                opacity: ".12",
              }),
            );
          }),
          y.default.createElement(
            "g",
            { transform: "translate(128 60)" },
            y.default.createElement("path", { d: "M2 0v62", stroke: "#C9C4B8", strokeWidth: "2" }),
            y.default.createElement("path", { d: "M3 2h10v16H3z", fill: "#1F3A93" }),
            y.default.createElement("path", { d: "M13 2h10v16H13z", fill: "#FFFFFF" }),
            y.default.createElement("path", { d: "M23 2h10v16H23z", fill: "#D7263D" }),
            y.default.createElement("circle", { cx: "2", cy: "0", r: "2", fill: "#F2B134" }),
          ),
          y.default.createElement(
            "g",
            { transform: "translate(184 98)" },
            y.default.createElement("path", { d: "M0 4h52l-4 10H4z", fill: "#FFFFFF" }),
            y.default.createElement("path", { d: "M0 4h52", stroke: "#D7263D", strokeWidth: "2" }),
            y.default.createElement("path", {
              d: "M4 14l-3 12M48 14l3 12",
              stroke: "#8A5A26",
              strokeWidth: "2.4",
            }),
            [0, 1, 2, 3, 4].map((e) =>
              y.default.createElement("rect", {
                key: e,
                x: 4 + e * 9,
                y: "7",
                width: "4.4",
                height: "4.4",
                fill: "#D7263D",
                opacity: ".55",
              }),
            ),
            y.default.createElement("path", { d: "M12 4v-10h4v10z", fill: "#2E7D32" }),
            y.default.createElement("rect", {
              x: "12.6",
              y: "-9",
              width: "2.8",
              height: "4",
              fill: "#F2D08A",
            }),
            y.default.createElement("path", { d: "M24 4l3-8h12l3 8z", fill: "#E3A644" }),
            y.default.createElement("circle", { cx: "44", cy: "1", r: "3", fill: "#D7263D" }),
          ),
        ),
      }),
  },
  Ur = (t) =>
    Object.entries(t)
      .map(([e, n]) => "--" + e + ":" + n)
      .join(";"),
  C2 = {
    galette: {
      accessoire: y.default.createElement(T2, { t: 30, c: "#E9C46A" }),
      accPos: { left: 22, top: -7 },
      fil: "#B8860B",
      items: [
        () => y.default.createElement(T2, { t: 15 }),
        () => y.default.createElement(hf, { t: 12, c: "#F4D774" }),
      ],
      vol: "pluie",
      pluie: [
        (t) => y.default.createElement(hf, { t, c: "#F4D774" }),
        (t) => y.default.createElement(T2, { t: t + 4, c: "#E9C46A" }),
        (t) => y.default.createElement(hf, { t: t * 0.7, c: "#FFF3C4" }),
      ],
      tampon: "\u{1F451}",
      pastille: y.default.createElement(
        y.default.Fragment,
        null,
        "Bonne",
        y.default.createElement("br", null),
        "\xC9piphanie",
      ),
      carte: { bg: "linear-gradient(140deg,#8A6418,#3E2A08)", titre: "#F4E2A8" },
      logo: "logo-galette.png",
      coin: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 20'%3E%3Cpath d='M1 18V5l6 6 6-10 6 10 6-6v13z' fill='%23D4AF37'/%3E%3Ccircle cx='13' cy='10' r='1.8' fill='%23C62828'/%3E%3C/svg%3E")`,
      village: {
        ciel: "linear-gradient(#141A33 0%,#2E3560 40%,#7A5A6E 72%,#E8C27A 100%)",
        astre: "radial-gradient(circle at 40% 38%,#FFF8DC,#F4D774 60%,#C9A227)",
        fond: "#5A4A62",
        sol: ["#3A2E40", "#2A2030"],
      },
      css: Ur({
        bg: "#FBF7EC",
        forest: "#6B4A10",
        apple: "#B8862C",
        "apple-l": "#D4AF37",
        "apple-soft": "#FBF3DC",
        terra: "#8A5A1E",
        gold: "#C9972C",
        ink: "#2E2414",
        ink2: "#6A5A40",
        ink3: "#A89A80",
        line: "#EDE2C8",
      }),
      motif: "%23B8862C",
      etq: {
        fond: "linear-gradient(160deg,#FBF0CC 0%,#F0D58A 60%,#E3BE5E 100%)",
        texte: "#4A3208",
        bande: "#7A5A12",
        bandeTxt: "#FFF3C4",
        pastille: "radial-gradient(circle at 35% 30%,#F4D774,#D4AF37 60%,#A8841C)",
        pastilleTxt: "#4A3208",
      },
    },
    chandeleur: {
      accessoire: y.default.createElement(
        "svg",
        { viewBox: "0 0 30 28", width: "28", height: "26" },
        y.default.createElement("rect", {
          x: "5",
          y: "17",
          width: "20",
          height: "9",
          rx: "2",
          fill: "#FFFFFF",
          stroke: "#E2D8C8",
        }),
        y.default.createElement("circle", { cx: "9", cy: "12", r: "6", fill: "#FFFFFF" }),
        y.default.createElement("circle", { cx: "15", cy: "8", r: "7", fill: "#FFFFFF" }),
        y.default.createElement("circle", { cx: "21", cy: "12", r: "6", fill: "#FFFFFF" }),
      ),
      accPos: { left: 25, top: -8 },
      fil: "#9A5A22",
      items: [() => y.default.createElement(I2, { t: 17 }), () => y.default.createElement(mO, { t: 15 })],
      vol: "pluie",
      pluie: [
        (t) => y.default.createElement(I2, { t: t + 4 }),
        (t) => y.default.createElement(hf, { t: t * 0.6, c: "#FFFFFF" }),
        (t) => y.default.createElement(I2, { t }),
      ],
      tampon: "\u{1F95E}",
      pastille: y.default.createElement(
        y.default.Fragment,
        null,
        "Bonne",
        y.default.createElement("br", null),
        "Chandeleur",
      ),
      carte: { bg: "linear-gradient(140deg,#A8642A,#4A2410)", titre: "#FFE0A8" },
      logo: "logo-chandeleur.png",
      coin: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'%3E%3Cellipse cx='12' cy='8' rx='11' ry='6.5' fill='%23E9B35A'/%3E%3Cellipse cx='12' cy='7.4' rx='9' ry='4.8' fill='%23F2CB7C'/%3E%3C/svg%3E")`,
      village: {
        ciel: "linear-gradient(#1E2A44 0%,#3E4C78 40%,#A8706A 74%,#F6C890 100%)",
        astre: "radial-gradient(circle at 40% 38%,#FFF6E0,#F6D2A0 65%,#E0A060)",
        fond: "#7A6A80",
        sol: ["#6A4A34", "#4A3022"],
      },
      css: Ur({
        bg: "#FCF6EE",
        forest: "#7A4418",
        apple: "#C97A2A",
        "apple-l": "#E0A040",
        "apple-soft": "#FCF0DE",
        terra: "#9A5A22",
        gold: "#E0A040",
        ink: "#3A2414",
        ink2: "#7A5A44",
        ink3: "#B09A88",
        line: "#F0E0CC",
      }),
      motif: "%23C97A2A",
      etq: {
        fond: "linear-gradient(160deg,#FCEFD6 0%,#F2D29A 60%,#E3B46A 100%)",
        texte: "#5A3214",
        bande: "#9A5A22",
        bandeTxt: "#FFF0D0",
        pastille: "radial-gradient(circle at 35% 30%,#F2CB7C,#E0A040 60%,#B8762A)",
        pastilleTxt: "#4A2410",
      },
    },
    valentin: {
      accessoire: y.default.createElement(
        "svg",
        { viewBox: "0 0 40 26", width: "34", height: "22" },
        y.default.createElement("path", {
          d: "M6 24q14-12 28 0",
          stroke: "#C2185B",
          strokeWidth: "2.4",
          fill: "none",
        }),
        y.default.createElement("path", {
          d: "M12 18q-2-6 0-10M28 18q2-6 0-10",
          stroke: "#C2185B",
          strokeWidth: "1.4",
          fill: "none",
        }),
        y.default.createElement(
          "g",
          { transform: "translate(4 0) scale(.5)" },
          y.default.createElement("path", {
            d: "M12 21C4 15 1 11 2.5 6.5 4 2.5 9 2 12 6 15 2 20 2.5 21.5 6.5 23 11 20 15 12 21z",
            fill: "#E0284A",
          }),
        ),
        y.default.createElement(
          "g",
          { transform: "translate(24 0) scale(.5)" },
          y.default.createElement("path", {
            d: "M12 21C4 15 1 11 2.5 6.5 4 2.5 9 2 12 6 15 2 20 2.5 21.5 6.5 23 11 20 15 12 21z",
            fill: "#E0284A",
          }),
        ),
      ),
      accPos: { left: 22, top: -6 },
      fil: "#A3243E",
      items: [
        () => y.default.createElement(Ju, { t: 14, c: "#E0284A" }),
        () => y.default.createElement(Ju, { t: 12, c: "#F48FB1" }),
      ],
      vol: "monte",
      pluie: [
        (t) => y.default.createElement(Ju, { t, c: "#E0284A" }),
        (t) => y.default.createElement(Ju, { t: t * 0.8, c: "#F48FB1" }),
        (t) => y.default.createElement(Ju, { t: t * 0.6, c: "#FFFFFF" }),
      ],
      tampon: "\u2764\uFE0F",
      pastille: y.default.createElement(
        y.default.Fragment,
        null,
        "Joyeuse",
        y.default.createElement("br", null),
        "St-Valentin",
      ),
      carte: { bg: "linear-gradient(140deg,#B8304E,#5A0F22)", titre: "#FFD6E0" },
      logo: "logo-valentin.png",
      coin: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 22'%3E%3Cpath d='M12 21C4 15 1 11 2.5 6.5 4 2.5 9 2 12 6 15 2 20 2.5 21.5 6.5 23 11 20 15 12 21z' fill='%23E0284A'/%3E%3C/svg%3E")`,
      village: {
        ciel: "linear-gradient(#2A0E22 0%,#5E1A3E 40%,#B8445E 72%,#F6A898 100%)",
        astre: "radial-gradient(circle at 40% 38%,#FFF0E6,#F8C0A8 65%,#E07A6A)",
        fond: "#8A3A5A",
        sol: ["#5A1A34", "#3E1024"],
      },
      css: Ur({
        bg: "#FCF4F5",
        forest: "#A3243E",
        apple: "#D0405E",
        "apple-l": "#C2185B",
        "apple-soft": "#FCE7EC",
        terra: "#A3243E",
        gold: "#E0A040",
        ink: "#3A1A22",
        ink2: "#7A4A56",
        ink3: "#B8949E",
        line: "#F2D8DE",
      }),
      motif: "%23D0405E",
      etq: {
        fond: "linear-gradient(160deg,#FCE7EC 0%,#F6C2CE 60%,#EC98AE 100%)",
        texte: "#5A0F22",
        bande: "#A3243E",
        bandeTxt: "#FFE3EA",
        pastille: "radial-gradient(circle at 35% 30%,#F06A86,#D0284A 60%,#8A1030)",
      },
    },
    paques: {
      accessoire: y.default.createElement(
        "svg",
        { viewBox: "0 0 30 30", width: "26", height: "26" },
        y.default.createElement("path", {
          d: "M9 28C5 18 5 6 9 2c4 4 4 16 2 26z",
          fill: "#FFFFFF",
          stroke: "#E2D8C8",
        }),
        y.default.createElement("path", { d: "M9 24C7 16 7 9 9 6c2 3 2 10 1 18z", fill: "#F4B6C8" }),
        y.default.createElement("path", {
          d: "M19 28c0-10 3-22 8-24 2 5 0 16-5 24z",
          fill: "#FFFFFF",
          stroke: "#E2D8C8",
        }),
        y.default.createElement("path", { d: "M20 24c1-8 3-14 6-16 1 4-1 10-4 16z", fill: "#F4B6C8" }),
      ),
      accPos: { left: 27, top: -14 },
      fil: "#4E7F3E",
      items: [
        () => y.default.createElement(Ui, { t: 14, c: "#F6C6D9", r: "#E05A73" }),
        () => y.default.createElement(Ui, { t: 14, c: "#BFE3F2", r: "#1F6FB2" }),
      ],
      vol: "passe",
      passe: y.default.createElement(wO, null),
      saut: !0,
      tampon: "\u{1F95A}",
      pastille: y.default.createElement(
        y.default.Fragment,
        null,
        "Joyeuses",
        y.default.createElement("br", null),
        "P\xE2ques",
      ),
      carte: { bg: "linear-gradient(140deg,#5E9A4A,#2A4A22)", titre: "#FCE38A" },
      logo: "logo-paques.png",
      coin: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 26'%3E%3Cpath d='M10 1C4.5 1 1 9 1 15.5 1 21 5 25 10 25s9-4 9-9.5C19 9 15.5 1 10 1z' fill='%23F9E79F'/%3E%3Cpath d='M1.6 12.5q2.8-2.4 5.6 0t5.6 0 5.6 0' stroke='%23E05A73' stroke-width='1.6' fill='none'/%3E%3C/svg%3E")`,
      village: {
        ciel: "linear-gradient(#244E7E 0%,#3E76AA 40%,#8CC0DC 75%,#F6E8B8 100%)",
        astre: "radial-gradient(circle at 40% 38%,#FFFDE8,#FCE38A 60%,#F2C14E)",
        fond: "#7AAE5E",
        sol: ["#5E9A44", "#467E32"],
        jour: !0,
      },
      css: Ur({
        bg: "#F7F9EE",
        forest: "#3F6B3A",
        apple: "#6FA84E",
        "apple-l": "#E9A23B",
        "apple-soft": "#F3F7E6",
        terra: "#C97A2A",
        gold: "#E9A23B",
        ink: "#24301E",
        ink2: "#5A6A50",
        ink3: "#9AA88E",
        line: "#E2EAD4",
      }),
      motif: "%236FA84E",
      etq: {
        fond: "linear-gradient(160deg,#FFFDF0 0%,#F7EEC2 60%,#EBDC96 100%)",
        texte: "#2A4A22",
        bande: "#4E7F3E",
        bandeTxt: "#FCE38A",
        pastille: "radial-gradient(circle at 35% 30%,#F8B6CC,#E88AAE 60%,#B85A80)",
      },
    },
    muguet: {
      accessoire: y.default.createElement(Ru, { t: 24 }),
      accPos: { left: 44, top: 22 },
      fil: "#3F6B3A",
      items: [
        () => y.default.createElement(Ru, { t: 16 }),
        () =>
          y.default.createElement(
            "svg",
            { viewBox: "0 0 10 10", width: "8", height: "8" },
            y.default.createElement("circle", { cx: "5", cy: "5", r: "4", fill: "#FFFFFF" }),
          ),
      ],
      vol: "pluie",
      pluie: [
        (t) => y.default.createElement(Ru, { t: t + 6 }),
        (t) =>
          y.default.createElement(
            "svg",
            { viewBox: "0 0 12 12", width: t * 0.6, height: t * 0.6 },
            y.default.createElement("path", { d: "M1 8a5 5 0 0 1 10 0l-1 3H2z", fill: "#FFFFFF" }),
          ),
        (t) => y.default.createElement(Ru, { t: t + 2 }),
      ],
      tampon: "\u{1F340}",
      pastille: y.default.createElement(
        y.default.Fragment,
        null,
        "Porte-",
        y.default.createElement("br", null),
        "bonheur",
      ),
      carte: { bg: "linear-gradient(140deg,#3F7A3A,#18361A)", titre: "#FFFFFF" },
      logo: "logo-muguet.png",
      coin: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 30'%3E%3Cpath d='M7 29C3 20 4 9 10 3c-1 9 0 17 2 26z' fill='%235E9A3E'/%3E%3Cpath d='M15 9a2.6 2.6 0 0 1 5.2 0l-.6 2.2h-4zM13.6 15a2.6 2.6 0 0 1 5.2 0l-.6 2.2h-4zM12.6 21a2.6 2.6 0 0 1 5.2 0l-.6 2.2h-4z' fill='%23FFFFFF' stroke='%2394A48A' stroke-width='.6'/%3E%3C/svg%3E")`,
      village: {
        ciel: "linear-gradient(#1E3E3E 0%,#2E6260 40%,#7AAE9A 75%,#E8F0C8 100%)",
        astre: "radial-gradient(circle at 40% 38%,#FFFDF0,#F4F0C0 65%,#D8D890)",
        fond: "#4E7A44",
        sol: ["#3E6A34", "#2A4E24"],
        jour: !0,
      },
      css: Ur({
        bg: "#F4F8F0",
        forest: "#2F5A2E",
        apple: "#5E9A3E",
        "apple-l": "#8BBF6A",
        "apple-soft": "#EEF6E8",
        terra: "#3F6B3A",
        gold: "#C9B458",
        ink: "#1E2A1C",
        ink2: "#506048",
        ink3: "#94A48A",
        line: "#DCE8D2",
      }),
      motif: "%235E9A3E",
      etq: {
        fond: "linear-gradient(160deg,#FFFFFF 0%,#EEF6E8 60%,#D6E8C8 100%)",
        texte: "#24461F",
        bande: "#3F6B3A",
        bandeTxt: "#FFFFFF",
        pastille: "radial-gradient(circle at 35% 30%,#8BBF6A,#5E9A3E 60%,#2F5A2E)",
      },
    },
    meres: {
      accessoire: y.default.createElement(qi, { t: 20, c: "#F48FB1" }),
      accPos: { left: 20, top: 2 },
      fil: "#B04A73",
      items: [
        () => y.default.createElement(qi, { t: 14, c: "#F48FB1" }),
        () => y.default.createElement(qi, { t: 13, c: "#CE93D8" }),
      ],
      vol: "pluie",
      pluie: [
        (t) => y.default.createElement(qi, { t, c: "#F48FB1" }),
        (t) =>
          y.default.createElement(
            "svg",
            { viewBox: "0 0 12 16", width: t * 0.6, height: t * 0.8 },
            y.default.createElement("ellipse", { cx: "6", cy: "8", rx: "4.4", ry: "7", fill: "#F8BBD0" }),
          ),
        (t) => y.default.createElement(qi, { t: t * 0.8, c: "#CE93D8" }),
      ],
      tampon: "\u{1F490}",
      pastille: y.default.createElement(
        y.default.Fragment,
        null,
        "Bonne f\xEAte",
        y.default.createElement("br", null),
        "maman",
      ),
      carte: { bg: "linear-gradient(140deg,#C05A84,#5A1A38)", titre: "#FFE3EE" },
      logo: "logo-meres.png",
      coin: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='%23F48FB1'%3E%3Cellipse cx='12' cy='6' rx='4.2' ry='5.6'/%3E%3Cellipse cx='12' cy='6' rx='4.2' ry='5.6' transform='rotate(72 12 12)'/%3E%3Cellipse cx='12' cy='6' rx='4.2' ry='5.6' transform='rotate(144 12 12)'/%3E%3Cellipse cx='12' cy='6' rx='4.2' ry='5.6' transform='rotate(216 12 12)'/%3E%3Cellipse cx='12' cy='6' rx='4.2' ry='5.6' transform='rotate(288 12 12)'/%3E%3C/g%3E%3Ccircle cx='12' cy='12' r='3.4' fill='%23FFD54F'/%3E%3C/svg%3E")`,
      village: {
        ciel: "linear-gradient(#5A1E44 0%,#9A3E6A 40%,#E08AA8 75%,#FCE0D4 100%)",
        astre: "radial-gradient(circle at 40% 38%,#FFF6F0,#FCD0C0 65%,#F0A090)",
        fond: "#C27A98",
        sol: ["#6A9A4E", "#4E7E3A"],
        jour: !0,
      },
      css: Ur({
        bg: "#FDF5F8",
        forest: "#9A3A63",
        apple: "#C85A88",
        "apple-l": "#E88AAE",
        "apple-soft": "#FCEAF2",
        terra: "#B04A73",
        gold: "#E0A040",
        ink: "#3A1A2A",
        ink2: "#7A5268",
        ink3: "#B89AAA",
        line: "#F2DCE6",
      }),
      motif: "%23C85A88",
      etq: {
        fond: "linear-gradient(160deg,#FFF4F8 0%,#FBD3E2 60%,#F2AFC8 100%)",
        texte: "#5A1A38",
        bande: "#B04A73",
        bandeTxt: "#FFF0F6",
        pastille: "radial-gradient(circle at 35% 30%,#F48FB1,#D05A8A 60%,#9A3A63)",
      },
    },
    musique: {
      accessoire: y.default.createElement(
        "svg",
        { viewBox: "0 0 40 30", width: "38", height: "28" },
        y.default.createElement("path", {
          d: "M5 22V16a15 15 0 0 1 30 0v6",
          stroke: "#2E2250",
          strokeWidth: "3.4",
          fill: "none",
        }),
        y.default.createElement("rect", {
          x: "1",
          y: "16",
          width: "8",
          height: "13",
          rx: "3",
          fill: "#F2B134",
        }),
        y.default.createElement("rect", {
          x: "31",
          y: "16",
          width: "8",
          height: "13",
          rx: "3",
          fill: "#F2B134",
        }),
      ),
      accPos: { left: 18, top: -4 },
      fil: "#4F3A8C",
      items: [
        () => y.default.createElement(Xu, { t: 14, c: "#F2B134" }),
        () => y.default.createElement(Xu, { t: 14, c: "#E05A73", d: !0 }),
      ],
      vol: "monte",
      pluie: [
        (t) => y.default.createElement(Xu, { t, c: "#F2B134" }),
        (t) => y.default.createElement(Xu, { t, c: "#7A5AC8", d: !0 }),
        (t) => y.default.createElement(Xu, { t: t * 0.8, c: "#E05A73" }),
      ],
      tampon: "\u{1F3B5}",
      pastille: y.default.createElement(
        y.default.Fragment,
        null,
        "F\xEAte de la",
        y.default.createElement("br", null),
        "musique",
      ),
      carte: { bg: "linear-gradient(140deg,#5E46A8,#1E1446)", titre: "#F2B134" },
      logo: "logo-musique.png",
      coin: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M14 18V2c2 3 6 4 6 9' stroke='%23F2B134' stroke-width='2.2' fill='none' stroke-linecap='round'/%3E%3Cellipse cx='10.4' cy='18.6' rx='4' ry='3' fill='%23F2B134'/%3E%3C/svg%3E")`,
      village: {
        ciel: "linear-gradient(#1A1240 0%,#3E2E7A 40%,#A85878 74%,#F6B46A 100%)",
        astre: null,
        fond: "#5A3E7A",
        sol: ["#2E2250", "#1E1638"],
      },
      css: Ur({
        bg: "#F6F3FB",
        forest: "#4F3A8C",
        apple: "#6A4AB8",
        "apple-l": "#F2B134",
        "apple-soft": "#EFEAF8",
        terra: "#E05A73",
        gold: "#F2B134",
        ink: "#221A3A",
        ink2: "#5A5078",
        ink3: "#9A92B4",
        line: "#E2DCF0",
      }),
      motif: "%236A4AB8",
      etq: {
        fond: "linear-gradient(160deg,#4F3A8C 0%,#2E2260 70%)",
        texte: "#F2B134",
        bande: "#F2B134",
        bandeTxt: "#2E2260",
        pastille: "radial-gradient(circle at 35% 30%,#F06A86,#E05A73 60%,#A8304E)",
      },
    },
    peres: {
      accessoire: y.default.createElement(
        "svg",
        { viewBox: "0 0 40 22", width: "34", height: "19" },
        y.default.createElement("path", {
          d: "M4 16c0-9 7-14 16-14s15 4 16 10c-4 2-10 3-16 3S8 16 4 16z",
          fill: "#6A6E74",
        }),
        y.default.createElement("path", { d: "M2 16c8 3 26 3 36-2l2 3c-10 5-30 5-38 1z", fill: "#4A4E54" }),
        y.default.createElement("path", {
          d: "M10 8q10-4 22 0",
          stroke: "#8A8E94",
          strokeWidth: "1",
          fill: "none",
        }),
      ),
      accPos: { left: 22, top: -3 },
      fil: "#24507E",
      items: [
        () => y.default.createElement(gO, { t: 16, c: "#24507E" }),
        () => y.default.createElement(vO, { t: 18 }),
      ],
      vol: "passe",
      passe: y.default.createElement(bO, null),
      tampon: "\u{1F454}",
      pastille: y.default.createElement(
        y.default.Fragment,
        null,
        "Bonne f\xEAte",
        y.default.createElement("br", null),
        "papa",
      ),
      carte: { bg: "linear-gradient(140deg,#2E6098,#0E2440)", titre: "#F2D08A" },
      logo: "logo-peres.png",
      coin: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 28'%3E%3Cpath d='M4 1h8l-2 5H6z' fill='%2324507E'/%3E%3Cpath d='M6 6h4l4 14-6 7-6-7z' fill='%235B8FC7'/%3E%3C/svg%3E")`,
      village: {
        ciel: "linear-gradient(#1E3E6E 0%,#3A6EA8 40%,#8CBCDE 76%,#FCEBC0 100%)",
        astre: "radial-gradient(circle at 40% 38%,#FFFDE8,#FCE38A 60%,#F2C14E)",
        fond: "#6E9E5E",
        sol: ["#5E9A44", "#467E32"],
        jour: !0,
      },
      css: Ur({
        bg: "#F3F7FB",
        forest: "#24507E",
        apple: "#3E72AE",
        "apple-l": "#5B8FC7",
        "apple-soft": "#E6EFF8",
        terra: "#C27B42",
        gold: "#D4A04A",
        ink: "#182638",
        ink2: "#4A5A70",
        ink3: "#8E9AAE",
        line: "#D8E2EE",
      }),
      motif: "%233E72AE",
      etq: {
        fond: "linear-gradient(160deg,#F2F7FC 0%,#CFE0F2 60%,#A8C6E6 100%)",
        texte: "#14304E",
        bande: "#24507E",
        bandeTxt: "#F2D08A",
        pastille: "radial-gradient(circle at 35% 30%,#D89A62,#C27B42 60%,#8A5226)",
      },
    },
    juillet: {
      accessoire: y.default.createElement(yO, { t: 20 }),
      accPos: { left: 20, top: 2 },
      fil: "#1F3A93",
      items: [
        () => y.default.createElement(uC, { t: 13, c: "#1F3A93" }),
        () => y.default.createElement(uC, { t: 13, c: "#D7263D" }),
      ],
      vol: "feux",
      feux: ["#FFFFFF", "#D7263D", "#5B8FF0", "#F2B134"],
      tampon: "\u{1F386}",
      pastille: y.default.createElement(
        y.default.Fragment,
        null,
        "Bon",
        y.default.createElement("br", null),
        "14 juillet",
      ),
      carte: { bg: "linear-gradient(140deg,#2A4AB0,#0E1A4A)", titre: "#FFD166" },
      logo: "logo-juillet.png",
      coin: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='11' fill='%23D7263D'/%3E%3Ccircle cx='12' cy='12' r='7.5' fill='%23FFFFFF'/%3E%3Ccircle cx='12' cy='12' r='4' fill='%231F3A93'/%3E%3C/svg%3E")`,
      village: {
        ciel: "linear-gradient(#060A24 0%,#121E52 45%,#24347A 75%,#3E3A7E 100%)",
        astre: null,
        fond: "#2A3468",
        sol: ["#18204A", "#0E1434"],
        feux: !0,
      },
      css: Ur({
        bg: "#F5F7FC",
        forest: "#1F3A93",
        apple: "#D7263D",
        "apple-l": "#2E5BD0",
        "apple-soft": "#EAF0FB",
        terra: "#D7263D",
        gold: "#F2B134",
        ink: "#141E3A",
        ink2: "#4A5478",
        ink3: "#9098B4",
        line: "#DCE2F2",
      }),
      motif: "%231F3A93",
      etq: {
        fond: "linear-gradient(90deg,#DCE4F8 0 33.3%,#FFFFFF 33.3% 66.6%,#F8DCE0 66.6%)",
        texte: "#14245E",
        bande: "#1F3A93",
        bandeTxt: "#FFFFFF",
        pastille: "radial-gradient(circle at 35% 30%,#F0506A,#D7263D 60%,#9A1428)",
      },
    },
  };
for (let t of k2) C2[t].scene = xO[t];
var CSS_MONTEE = `
.amb2-monte{position:fixed;inset:0;z-index:57;pointer-events:none;overflow:hidden;max-width:440px;margin:0 auto}
.amb2-monte.apercu{position:absolute}
.amb2-monte span{position:absolute;bottom:-30px;animation:monteAmb 10s ease-in-out infinite}
@keyframes monteAmb{0%{transform:translate(0,0) rotate(-8deg);opacity:0}10%{opacity:.95}50%{transform:translate(26px,-50vh) rotate(8deg)}100%{transform:translate(-14px,-105vh) rotate(-6deg);opacity:0}}
.amb2-ane.saut svg{animation:lapinSaut .55s cubic-bezier(.3,0,.5,1) infinite alternate}
@keyframes lapinSaut{from{transform:translateY(0)}to{transform:translateY(-14px)}}
.amb3-saute{animation:crepeSaute 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes crepeSaute{0%,100%{transform:translateY(32px) rotate(0)}45%{transform:translateY(-6px) rotate(180deg)}55%{transform:translateY(-6px) rotate(200deg)}}
.amb3-balance{animation:balance 4s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}
@keyframes balance{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
.amb3-flotte{animation:flotteAmb 3.6s ease-in-out infinite alternate}
@keyframes flotteAmb{from{transform:translate(0,0)}to{transform:translate(10px,-6px)}}
.amb3-clochette{animation:clochette 2.2s ease-in-out infinite alternate;transform-box:view-box}
@keyframes clochette{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
.amb3-fumee{animation:fumee 3s ease-in-out infinite;transform-box:fill-box}
@keyframes fumee{0%{opacity:.2;transform:translateY(4px)}50%{opacity:.8}100%{opacity:0;transform:translateY(-8px)}}
@media (prefers-reduced-motion: reduce){.amb2-monte,.amb3-saute,.amb3-balance,.amb3-flotte,.amb3-clochette,.amb3-fumee{animation:none}.amb2-monte{display:none}}
`;
var pf = ["beaujolais", "stnicolas", "nouvelan", ...k2],
  pC = ({ t = 16, c: c = "#6E1F45", f: f = "#6E9B3A" }) =>
    ReactDecors.default.createElement(
      "svg",
      { viewBox: "0 0 24 30", width: t, height: t * 1.25, "aria-hidden": "true" },
      ReactDecors.default.createElement("path", {
        d: "M12 4c0-2 1-3 3-4",
        stroke: "#5C3D2E",
        strokeWidth: "1.6",
        fill: "none",
      }),
      ReactDecors.default.createElement("path", { d: "M13 4c4-3 8-2 10 0-3 3-7 3-10 0z", fill: f }),
      ReactDecors.default.createElement(
        "g",
        { fill: c },
        ReactDecors.default.createElement("circle", { cx: "8", cy: "9", r: "3.4" }),
        ReactDecors.default.createElement("circle", { cx: "15", cy: "9", r: "3.4" }),
        ReactDecors.default.createElement("circle", { cx: "11.5", cy: "14", r: "3.4" }),
        ReactDecors.default.createElement("circle", { cx: "5", cy: "14", r: "3.2" }),
        ReactDecors.default.createElement("circle", { cx: "18", cy: "14", r: "3.2" }),
        ReactDecors.default.createElement("circle", { cx: "8", cy: "19", r: "3.2" }),
        ReactDecors.default.createElement("circle", { cx: "15", cy: "19", r: "3.2" }),
        ReactDecors.default.createElement("circle", { cx: "11.5", cy: "24", r: "3" }),
      ),
      ReactDecors.default.createElement(
        "g",
        { fill: "#fff", opacity: ".35" },
        ReactDecors.default.createElement("circle", { cx: "7", cy: "8", r: "1" }),
        ReactDecors.default.createElement("circle", { cx: "14", cy: "8", r: "1" }),
        ReactDecors.default.createElement("circle", { cx: "10.5", cy: "13", r: "1" }),
      ),
    ),
  fC = ({ t = 16, c: c = "#C9562A" }) =>
    ReactDecors.default.createElement(
      "svg",
      { viewBox: "0 0 24 24", width: t, height: t, "aria-hidden": "true" },
      ReactDecors.default.createElement("path", {
        d: "M12 22v-6M12 16c-3 0-9-2-10-7 3 0 5-1 5-4 2 2 3 1 5-3 2 4 3 5 5 3 0 3 2 4 5 4-1 5-7 7-10 7z",
        fill: c,
      }),
      ReactDecors.default.createElement("path", {
        d: "M12 16V6M12 12l-5-4M12 12l5-4",
        stroke: "#7A2E14",
        strokeWidth: ".8",
        fill: "none",
        opacity: ".6",
      }),
    ),
  S2 = ({ t = 18 }) =>
    ReactDecors.default.createElement(
      "svg",
      { viewBox: "0 0 24 22", width: t, height: t * 0.92, "aria-hidden": "true" },
      ReactDecors.default.createElement("path", {
        d: "M12 21C4 15 1 11 2.5 6.5 4 2.5 9 2 12 6 15 2 20 2.5 21.5 6.5 23 11 20 15 12 21z",
        fill: "#B5652E",
      }),
      ReactDecors.default.createElement("path", {
        d: "M12 18.5C6 14 3.5 11 4.6 7.4 5.7 4.6 9.3 4.4 12 7.8c2.7-3.4 6.3-3.2 7.4-.4 1.1 3.6-1.4 6.6-7.4 11.1z",
        fill: "none",
        stroke: "#FFF6E8",
        strokeWidth: "1.2",
        strokeDasharray: "1.6 1.4",
      }),
      ReactDecors.default.createElement("circle", { cx: "9", cy: "10", r: "1.2", fill: "#E8463A" }),
      ReactDecors.default.createElement("circle", { cx: "15", cy: "10", r: "1.2", fill: "#4E9A3E" }),
      ReactDecors.default.createElement("circle", { cx: "12", cy: "13.5", r: "1.2", fill: "#F2C14E" }),
    ),
  dC = ({ t = 14, c: c = "#E9B949" }) =>
    ReactDecors.default.createElement(
      "svg",
      { viewBox: "0 0 24 24", width: t, height: t, "aria-hidden": "true" },
      ReactDecors.default.createElement("path", {
        d: "M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6 5.6 21.1 7 14l-5.3-5 7.2-.9z",
        fill: c,
      }),
    );
var _O = ({ t = 14, c: c = "#E9B949" }) =>
    ReactDecors.default.createElement(
      "svg",
      { viewBox: "0 0 24 28", width: t, height: t * 1.16, "aria-hidden": "true" },
      ReactDecors.default.createElement("rect", {
        x: "9",
        y: "1",
        width: "6",
        height: "4",
        rx: "1",
        fill: "#B8860B",
      }),
      ReactDecors.default.createElement("circle", { cx: "12", cy: "16", r: "10", fill: c }),
      ReactDecors.default.createElement("path", {
        d: "M3 14h18M4 19h16",
        stroke: "#fff",
        strokeWidth: "1",
        opacity: ".5",
      }),
      ReactDecors.default.createElement("circle", {
        cx: "8",
        cy: "12",
        r: "2.4",
        fill: "#fff",
        opacity: ".5",
      }),
    ),
  mC = () =>
    ReactDecors.default.createElement(
      "svg",
      { viewBox: "0 0 120 70", width: "110", height: "64", "aria-hidden": "true" },
      ReactDecors.default.createElement(
        "g",
        { fill: "#3B2A36" },
        ReactDecors.default.createElement("path", {
          d: "M24 34c4-10 18-14 40-12 14 1 22 6 26 14l4 10c1 3-2 4-4 2l-4-6-2 18h-5l-1-15H40l-2 15h-5l-1-16c-6-2-9-5-8-10z",
        }),
        ReactDecors.default.createElement("path", {
          d: "M86 30c4-6 10-10 16-10 4 0 6 3 4 6l-6 8c-2 3-6 4-10 3z",
        }),
        ReactDecors.default.createElement("path", { d: "M96 20l2-12 4 1-1 12zM101 21l5-10 3 2-4 10z" }),
        ReactDecors.default.createElement("path", {
          d: "M24 36c-6 2-10 8-10 14",
          stroke: "#3B2A36",
          strokeWidth: "2.4",
          fill: "none",
          strokeLinecap: "round",
        }),
      ),
      ReactDecors.default.createElement(
        "g",
        null,
        ReactDecors.default.createElement("rect", {
          x: "42",
          y: "14",
          width: "14",
          height: "12",
          rx: "2",
          fill: "#B5652E",
        }),
        ReactDecors.default.createElement("rect", {
          x: "60",
          y: "14",
          width: "14",
          height: "12",
          rx: "2",
          fill: "#B5652E",
        }),
        ReactDecors.default.createElement("circle", { cx: "49", cy: "13", r: "3", fill: "#F39A1E" }),
        ReactDecors.default.createElement("circle", { cx: "67", cy: "13", r: "3", fill: "#F39A1E" }),
      ),
    ),
  wr = {
    beaujolais: {
      accessoire: ReactDecors.default.createElement(
        "svg",
        { viewBox: "0 0 40 24", width: "32", height: "19" },
        ReactDecors.default.createElement("ellipse", {
          cx: "20",
          cy: "15",
          rx: "18",
          ry: "7",
          fill: "#1E1A1C",
        }),
        ReactDecors.default.createElement("ellipse", {
          cx: "20",
          cy: "12",
          rx: "15",
          ry: "7",
          fill: "#2E2A2C",
        }),
        ReactDecors.default.createElement("path", {
          d: "M20 5v-4",
          stroke: "#1E1A1C",
          strokeWidth: "2.4",
          strokeLinecap: "round",
        }),
      ),
      accPos: { left: 26, top: -1 },
      fil: "#5A1830",
      items: [
        () => ReactDecors.default.createElement(pC, { t: 14 }),
        () => ReactDecors.default.createElement(fC, { t: 15 }),
      ],
      vol: "feuilles",
      tampon: "\u{1F347}",
      pastille: ReactDecors.default.createElement(
        ReactDecors.default.Fragment,
        null,
        "Avec",
        ReactDecors.default.createElement("br", null),
        "mod\xE9ration",
      ),
      carte: { bg: "linear-gradient(140deg,#7A2346,#3A0F22)", titre: "#F2C14E" },
      logo: "logo-beaujolais.png",
      coin: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 30'%3E%3Cg fill='%237A2346'%3E%3Ccircle cx='8' cy='9' r='3.4'/%3E%3Ccircle cx='15' cy='9' r='3.4'/%3E%3Ccircle cx='11.5' cy='14' r='3.4'/%3E%3Ccircle cx='8' cy='19' r='3.2'/%3E%3Ccircle cx='15' cy='19' r='3.2'/%3E%3Ccircle cx='11.5' cy='24' r='3'/%3E%3C/g%3E%3Cpath d='M13 4c4-3 8-2 10 0-3 3-7 3-10 0z' fill='%236E9B3A'/%3E%3C/svg%3E")`,
      village: {
        ciel: "linear-gradient(#2A0E1C 0%,#5A1830 40%,#A44A3E 72%,#E2A15E 100%)",
        astre: "radial-gradient(circle at 40% 38%,#FFE7B8,#F2B45E 60%,#C9762A)",
        fond: "#7A3A3E",
        murs: ["#4A1A2A", "#5A2232"],
        toits: "#2E0E1A",
        fen: ["#FFC46B", "#FFD98A"],
        sol: ["#3A1222", "#2A0C18"],
        vigne: !0,
      },
      css: "--bg:#F8F2F0;--forest:#5A1830;--apple:#9C3D6A;--apple-l:#C2185B;--apple-soft:#F6E8EE;--terra:#B5652E;--gold:#C9972C;--ink:#2E1A20;--ink2:#6A4A52;--ink3:#A8909A;--line:#EADBDE",
      motif: "%237A2346",
      etq: {
        fond: "linear-gradient(160deg,#F6E8EE 0%,#E9C9D6 60%,#D9A7BC 100%)",
        texte: "#4A1028",
        bande: "#6B1F3A",
        bandeTxt: "#F2C14E",
        pastille: "radial-gradient(circle at 35% 30%,#B0496E,#7A2346 60%,#4A1028)",
      },
    },
    stnicolas: {
      accessoire: ReactDecors.default.createElement(S2, { t: 17 }),
      accPos: { left: 42, top: 26 },
      fil: "#8E2430",
      items: [
        () => ReactDecors.default.createElement(S2, { t: 15 }),
        () => ReactDecors.default.createElement(dC, { t: 13 }),
      ],
      vol: "ane",
      tampon: "\u2B50",
      pastille: ReactDecors.default.createElement(
        ReactDecors.default.Fragment,
        null,
        "Bonne",
        ReactDecors.default.createElement("br", null),
        "St-Nicolas",
      ),
      carte: { bg: "linear-gradient(140deg,#8E2430,#3A0E14)", titre: "#F4D774" },
      logo: "logo-stnicolas.png",
      coin: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6 5.6 21.1 7 14l-5.3-5 7.2-.9z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
      village: {
        ciel: "linear-gradient(#0E1A33 0%,#23355E 45%,#5A5F8E 75%,#B9A6C4 100%)",
        astre: "radial-gradient(circle at 38% 36%,#FFFBE6,#F4E2A8 70%)",
        fond: "#8FA6C6",
        murs: ["#2A3552", "#33406A"],
        toits: "#F4F8FC",
        fen: ["#FFD86B", "#FFE9A8"],
        sol: ["#EEF4FA", "#FFFFFF"],
        neige: !0,
      },
      css: "--bg:#FBF5EE;--forest:#8E2430;--apple:#B5652E;--apple-l:#D4AF37;--apple-soft:#FBEFE4;--terra:#8E2430;--gold:#D4AF37;--ink:#2E1E18;--ink2:#6A5244;--ink3:#A8968A;--line:#EEDFD0",
      motif: "%23B5652E",
      etq: {
        fond: "linear-gradient(160deg,#D08A4E 0%,#B5652E 60%,#94501F 100%)",
        texte: "#FFF6E8",
        bande: "#8E2430",
        bandeTxt: "#F4D774",
        pastille: "radial-gradient(circle at 35% 30%,#F4D774,#D4AF37 60%,#A8841C)",
        pastilleTxt: "#5A1A1A",
        glacage: !0,
      },
    },
    nouvelan: {
      accessoire: ReactDecors.default.createElement(
        "svg",
        { viewBox: "0 0 30 40", width: "24", height: "32" },
        ReactDecors.default.createElement("path", { d: "M15 2 26 34H4z", fill: "#D4AF37" }),
        ReactDecors.default.createElement("path", { d: "M15 2 20 16 8 22z", fill: "#F4D774", opacity: ".7" }),
        ReactDecors.default.createElement("path", {
          d: "M7 26l4-2M12 30l5-3M17 23l4-2M9 14l3-1",
          stroke: "#1B1B2F",
          strokeWidth: "1.6",
          strokeLinecap: "round",
        }),
        ReactDecors.default.createElement("circle", { cx: "15", cy: "3", r: "3.4", fill: "#fff" }),
        ReactDecors.default.createElement("rect", {
          x: "2",
          y: "32",
          width: "26",
          height: "4",
          rx: "2",
          fill: "#B8860B",
        }),
      ),
      accPos: { left: 30, top: -10 },
      fil: "#D4AF37",
      items: [
        () => ReactDecors.default.createElement(dC, { t: 14, c: "#F4D774" }),
        () => ReactDecors.default.createElement(_O, { t: 13, c: "#C9A227" }),
      ],
      vol: "feux",
      tampon: "\u2728",
      pastille: ReactDecors.default.createElement(
        ReactDecors.default.Fragment,
        null,
        "Bonne",
        ReactDecors.default.createElement("br", null),
        "ann\xE9e !",
      ),
      carte: { bg: "linear-gradient(140deg,#2A2A48,#0B0B18)", titre: "#F4D774" },
      logo: "logo-nouvelan.png",
      coin: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6 5.6 21.1 7 14l-5.3-5 7.2-.9z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
      village: {
        ciel: "linear-gradient(#05050F 0%,#121230 45%,#24244E 75%,#3E3A6E 100%)",
        astre: null,
        fond: "#2E2E58",
        murs: ["#1E1E3A", "#262648"],
        toits: "#14142A",
        fen: ["#F4D774", "#FFE9A8"],
        sol: ["#16162C", "#0E0E1E"],
        feux: !0,
      },
      css: "--bg:#F6F4FA;--forest:#1B1B2F;--apple:#B8860B;--apple-l:#D4AF37;--apple-soft:#F7F1DE;--terra:#3E3A6E;--gold:#D4AF37;--ink:#1B1B2F;--ink2:#555570;--ink3:#9A98B0;--line:#E2DFEC",
      motif: "%23B8860B",
      etq: {
        fond: "linear-gradient(160deg,#2E2E52 0%,#1B1B2F 70%)",
        texte: "#F4D774",
        bande: "#D4AF37",
        bandeTxt: "#1B1B2F",
        pastille: "radial-gradient(circle at 35% 30%,#F4D774,#D4AF37 60%,#9A7012)",
        pastilleTxt: "#1B1B2F",
      },
    },
  };
Object.assign(wr, C2);
var gC = ({ id: id, decal: decal = {} }) => {
  let n = wr[id];
  return n
    ? ReactDecors.default.createElement(
        "span",
        { className: "amb2-acc", style: { ...n.accPos, ...decal }, "aria-hidden": "true" },
        n.accessoire,
      )
    : null;
};
function vC({ id: id, n: e = 9, apercu: apercu }) {
  let r = wr[id];
  return r
    ? ReactDecors.default.createElement(
        "div",
        { className: "amb-guirl" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
        ReactDecors.default.createElement(
          "svg",
          { className: "amb-fil", viewBox: "0 0 300 24", preserveAspectRatio: "none" },
          ReactDecors.default.createElement("path", {
            d:
              "M0 3 " +
              Array.from(
                { length: e },
                (i, s) => "Q" + ((s + 0.5) * 300) / e + " 15 " + ((s + 1) * 300) / e + " 3",
              ).join(" "),
            fill: "none",
            stroke: r.fil,
            strokeWidth: "1.3",
          }),
        ),
        Array.from({ length: e * 2 }, (i, s) => {
          let o = r.items[s % 2];
          return ReactDecors.default.createElement(
            "span",
            {
              key: s,
              className: "amb-lanterne",
              style: { left: ((s + 0.5) * 100) / (e * 2) + "%", animationDelay: (s % 5) * 0.37 + "s" },
            },
            ReactDecors.default.createElement(o, null),
          );
        }),
      )
    : null;
}
function DecorAne({ id: id, apercu: apercu }) {
  let n = wr[id];
  if (!n) return null;
  if (n.vol === "ane")
    return ReactDecors.default.createElement(
      "div",
      { className: "amb2-ane" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
      ReactDecors.default.createElement(mC, null),
    );
  if (n.vol === "feuilles")
    return ReactDecors.default.createElement(
      "div",
      { className: "amb2-feuilles" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
      [
        [8, 0, 20, "#C9562A"],
        [30, 1.6, 16, "#E08A2E"],
        [55, 0.8, 22, "#A8402A"],
        [78, 2.4, 17, "#D9A13A"],
        [92, 1.2, 14, "#C9562A"],
      ].map(([i, s, o, a], u) =>
        ReactDecors.default.createElement(
          "span",
          { key: u, style: { left: i + "%", animationDelay: s + "s" } },
          ReactDecors.default.createElement(fC, { t: o, c: a }),
        ),
      ),
    );
  if (n.vol === "passe")
    return ReactDecors.default.createElement(
      "div",
      { className: "amb2-ane" + (n.saut ? " saut" : "") + (apercu ? " apercu" : ""), "aria-hidden": "true" },
      n.passe,
    );
  if (n.vol === "pluie" || n.vol === "monte")
    return ReactDecors.default.createElement(
      "div",
      {
        className: (n.vol === "monte" ? "amb2-monte" : "amb2-feuilles") + (apercu ? " apercu" : ""),
        "aria-hidden": "true",
      },
      [
        [8, 0, 18],
        [30, 1.6, 15],
        [55, 0.8, 20],
        [78, 2.4, 16],
        [92, 1.2, 13],
        [42, 3.4, 14],
      ].map(([i, s, o], a) => {
        let u = n.pluie[a % n.pluie.length];
        return ReactDecors.default.createElement(
          "span",
          { key: a, style: { left: i + "%", animationDelay: s + "s" } },
          u(o),
        );
      }),
    );
  let r = n.feux || ["#F4D774", "#F48FB1", "#81D4FA", "#F4D774"];
  return n.vol === "feux"
    ? ReactDecors.default.createElement(
        "div",
        { className: "amb2-feux" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
        [
          [18, 14, 0, r[0]],
          [74, 10, 1.1, r[1]],
          [48, 22, 2.2, r[2]],
          [86, 26, 3.1, r[3]],
        ].map(([i, s, o, a], u) =>
          ReactDecors.default.createElement(
            "span",
            { key: u, style: { left: i + "%", top: s + "%", animationDelay: o + "s", "--c": a } },
            Array.from({ length: 12 }, (d, h) =>
              ReactDecors.default.createElement("i", { key: h, style: { "--a": h * 30 + "deg" } }),
            ),
          ),
        ),
      )
    : null;
}
var hC = ({ x: x, y: e, h: h, c: c = "#1E3A3A", neige: neige }) =>
    ReactDecors.default.createElement(
      "g",
      null,
      ReactDecors.default.createElement("path", {
        d: `M${x} ${e - h}l${h * 0.32} ${h * 0.42}h-${h * 0.14}l${h * 0.24} ${h * 0.34}h-${h * 0.14}l${h * 0.26} ${h * 0.24}H${x - h * 0.42}l${h * 0.26} -${h * 0.24}h-${h * 0.14}l${h * 0.24} -${h * 0.34}h-${h * 0.14}z`,
        fill: c,
      }),
      neige &&
        ReactDecors.default.createElement("path", {
          d: `M${x} ${e - h}l${h * 0.16} ${h * 0.21}-${h * 0.08} .4-${h * 0.08}-${h * 0.06}-${h * 0.08} ${h * 0.06}-${h * 0.08}-.4zM${x - h * 0.3} ${e - h * 0.24}q${h * 0.3} -${h * 0.1} ${h * 0.6} 0`,
          fill: "#FFFFFF",
          stroke: "#FFFFFF",
          strokeWidth: "1.6",
          strokeLinecap: "round",
          opacity: ".95",
        }),
      ReactDecors.default.createElement("rect", {
        x: x - h * 0.05,
        y: e,
        width: h * 0.1,
        height: h * 0.1,
        fill: "#3B2A1E",
      }),
    ),
  VillageBeaujolais = ({ id: id, v: v }) =>
    id === "beaujolais"
      ? ReactDecors.default.createElement(
          "svg",
          {
            className: "amb-village",
            viewBox: "0 0 400 150",
            preserveAspectRatio: "xMidYMax slice",
            "aria-hidden": "true",
          },
          ReactDecors.default.createElement("path", {
            d: "M0 92Q80 70 170 84t230-4V150H0z",
            fill: v.fond,
            opacity: ".6",
          }),
          [0, 1, 2, 3].map((n) =>
            ReactDecors.default.createElement(
              "g",
              { key: n, opacity: 0.5 + n * 0.15 },
              Array.from({ length: 16 }, (r, i) => {
                let s = i * 27 + (n % 2) * 13,
                  o = 92 + n * 9;
                return ReactDecors.default.createElement(
                  "g",
                  { key: i },
                  ReactDecors.default.createElement("path", {
                    d: `M${s} ${o}v-${7 + n * 2}`,
                    stroke: "#3A1E14",
                    strokeWidth: 0.9 + n * 0.3,
                  }),
                  ReactDecors.default.createElement("ellipse", {
                    cx: s,
                    cy: o - 7 - n * 2,
                    rx: 6 + n * 2,
                    ry: 3 + n,
                    fill: n % 2 ? "#5E7A2E" : "#7A6A2A",
                  }),
                  i % 3 === n % 3 &&
                    ReactDecors.default.createElement("circle", {
                      cx: s + 2,
                      cy: o - 4 - n * 2,
                      r: 1.4 + n * 0.4,
                      fill: "#5A1438",
                    }),
                );
              }),
            ),
          ),
          ReactDecors.default.createElement("path", {
            d: "M0 126Q120 116 220 122t180-6V150H0z",
            fill: v.sol[0],
          }),
          ReactDecors.default.createElement("path", {
            d: "M0 136Q120 128 220 133t180-4V150H0z",
            fill: v.sol[1],
          }),
          ReactDecors.default.createElement(
            "g",
            { transform: "translate(124 82) scale(.9)" },
            ReactDecors.default.createElement("ellipse", {
              cx: "22",
              cy: "36",
              rx: "26",
              ry: "4",
              fill: "#000",
              opacity: ".25",
            }),
            ReactDecors.default.createElement("path", { d: "M2 6Q0 20 2 34h40q2-14 0-28z", fill: "#7A4A26" }),
            ReactDecors.default.createElement("path", {
              d: "M2 6Q0 20 2 34",
              stroke: "#5A3418",
              strokeWidth: "1.2",
              fill: "none",
            }),
            [11, 22, 33].map((n) =>
              ReactDecors.default.createElement("path", {
                key: n,
                d: `M${n} 6v28`,
                stroke: "#5A3418",
                strokeWidth: ".8",
                opacity: ".6",
              }),
            ),
            ReactDecors.default.createElement("path", {
              d: "M1 11h42M0 20h44M1 29h42",
              stroke: "#2E2A2C",
              strokeWidth: "2",
            }),
            ReactDecors.default.createElement("ellipse", {
              cx: "22",
              cy: "6",
              rx: "20",
              ry: "4",
              fill: "#9A6234",
              stroke: "#2E2A2C",
              strokeWidth: "1.6",
            }),
          ),
          ReactDecors.default.createElement(
            "g",
            { transform: "translate(170 76) scale(.9)" },
            ReactDecors.default.createElement("path", {
              d: "M5 42V20q0-6 3-9V2h4v9q3 3 3 9v22z",
              fill: "#3A0F22",
            }),
            ReactDecors.default.createElement("rect", {
              x: "8",
              y: "0",
              width: "4",
              height: "4",
              fill: "#C9972C",
            }),
            ReactDecors.default.createElement("rect", {
              x: "6",
              y: "24",
              width: "8",
              height: "10",
              fill: "#F6E8EE",
            }),
            ReactDecors.default.createElement("circle", { cx: "10", cy: "29", r: "2", fill: "#9C3D6A" }),
          ),
          ReactDecors.default.createElement(
            "g",
            { transform: "translate(186 104) scale(.9)" },
            ReactDecors.default.createElement("path", {
              d: "M0 0h10l-1 8q-4 3-8 0z",
              fill: "#9C3D6A",
              opacity: ".85",
            }),
            ReactDecors.default.createElement("path", {
              d: "M5 9v7M1 16h8",
              stroke: "#F6E8EE",
              strokeWidth: "1.2",
            }),
          ),
          ReactDecors.default.createElement(
            "g",
            { transform: "translate(244 86)", opacity: ".9" },
            ReactDecors.default.createElement(pC, { t: 22, c: "#5A1438", f: "#6E9B3A" }),
          ),
        )
      : id === "stnicolas"
        ? ReactDecors.default.createElement(
            "svg",
            {
              className: "amb-village",
              viewBox: "0 0 400 150",
              preserveAspectRatio: "xMidYMax slice",
              "aria-hidden": "true",
            },
            ReactDecors.default.createElement("path", {
              d: "M0 94Q70 72 150 86t250-6V150H0z",
              fill: v.fond,
              opacity: ".55",
            }),
            [
              [22, 100, 34],
              [48, 104, 26],
              [330, 98, 38],
              [362, 104, 28],
              [388, 100, 32],
            ].map(([n, r, i], s) =>
              ReactDecors.default.createElement(hC, {
                key: "f" + s,
                x: n,
                y: r,
                h: i,
                c: "#24384E",
                neige: !0,
              }),
            ),
            ReactDecors.default.createElement("path", {
              d: "M0 108Q100 96 200 104t200-4V150H0z",
              fill: v.sol[0],
            }),
            [
              [118, 112, 30],
              [272, 110, 34],
              [292, 116, 24],
            ].map(([n, r, i], s) =>
              ReactDecors.default.createElement(hC, {
                key: "s" + s,
                x: n,
                y: r,
                h: i,
                c: "#1E3A3A",
                neige: !0,
              }),
            ),
            ReactDecors.default.createElement("path", {
              d: "M0 122Q120 112 220 119t180-6V150H0z",
              fill: v.sol[1],
            }),
            ReactDecors.default.createElement(
              "g",
              { transform: "translate(166 98)" },
              ReactDecors.default.createElement("path", {
                d: "M0 20h56q8 0 8-6",
                stroke: "#8E2430",
                strokeWidth: "2.4",
                fill: "none",
                strokeLinecap: "round",
              }),
              ReactDecors.default.createElement("path", { d: "M6 18V8h46v10z", fill: "#8E2430" }),
              ReactDecors.default.createElement("path", {
                d: "M6 8h46",
                stroke: "#D4AF37",
                strokeWidth: "1.6",
              }),
              ReactDecors.default.createElement("rect", {
                x: "12",
                y: "-2",
                width: "12",
                height: "10",
                rx: "1.5",
                fill: "#D4AF37",
              }),
              ReactDecors.default.createElement("path", {
                d: "M18 -2v10M12 3h12",
                stroke: "#8E2430",
                strokeWidth: "1.2",
              }),
              ReactDecors.default.createElement("circle", { cx: "32", cy: "3", r: "5", fill: "#F39A1E" }),
              ReactDecors.default.createElement("path", {
                d: "M32 -2c1-2 2-3 4-3",
                stroke: "#4E8A2A",
                strokeWidth: "1.4",
                fill: "none",
              }),
              ReactDecors.default.createElement(
                "g",
                { transform: "translate(38 -6)" },
                ReactDecors.default.createElement(S2, { t: 14 }),
              ),
            ),
          )
        : id === "nouvelan"
          ? ReactDecors.default.createElement(
              "svg",
              {
                className: "amb-village",
                viewBox: "0 0 400 150",
                preserveAspectRatio: "xMidYMax slice",
                "aria-hidden": "true",
              },
              [
                [130, 0],
                [210, 1.4],
                [270, 2.6],
              ].map(([n, r], i) =>
                ReactDecors.default.createElement("path", {
                  key: i,
                  className: "amb2-fusee",
                  style: { animationDelay: r + "s" },
                  d: `M${n} 104v-40`,
                  stroke: "#F4D774",
                  strokeWidth: "1.4",
                  strokeLinecap: "round",
                  strokeDasharray: "6 60",
                }),
              ),
              ReactDecors.default.createElement("path", {
                d: "M0 96Q80 74 170 88t230-6V150H0z",
                fill: v.fond,
                opacity: ".7",
              }),
              ReactDecors.default.createElement("path", {
                d: "M0 112Q100 98 200 106t200-4V150H0z",
                fill: v.sol[0],
              }),
              ReactDecors.default.createElement("path", {
                d: "M0 126Q120 116 220 122t180-6V150H0z",
                fill: v.sol[1],
              }),
              ReactDecors.default.createElement(
                "g",
                { transform: "translate(178 80)" },
                ReactDecors.default.createElement(
                  "g",
                  { transform: "rotate(-12 14 30)" },
                  ReactDecors.default.createElement("path", {
                    d: "M6 2h16l-2 14q-6 6-12 0z",
                    fill: "#F4D774",
                    opacity: ".9",
                  }),
                  ReactDecors.default.createElement("path", {
                    d: "M14 18v16M8 34h12",
                    stroke: "#D4AF37",
                    strokeWidth: "1.6",
                    strokeLinecap: "round",
                  }),
                  ReactDecors.default.createElement("circle", { cx: "11", cy: "9", r: "1", fill: "#fff" }),
                  ReactDecors.default.createElement("circle", { cx: "16", cy: "6", r: ".8", fill: "#fff" }),
                ),
                ReactDecors.default.createElement(
                  "g",
                  { transform: "translate(22 0) rotate(12 14 30)" },
                  ReactDecors.default.createElement("path", {
                    d: "M6 2h16l-2 14q-6 6-12 0z",
                    fill: "#F4D774",
                    opacity: ".9",
                  }),
                  ReactDecors.default.createElement("path", {
                    d: "M14 18v16M8 34h12",
                    stroke: "#D4AF37",
                    strokeWidth: "1.6",
                    strokeLinecap: "round",
                  }),
                  ReactDecors.default.createElement("circle", { cx: "13", cy: "10", r: "1", fill: "#fff" }),
                ),
                ReactDecors.default.createElement(
                  "g",
                  { fill: "#FFF3C4" },
                  [
                    [24, -6],
                    [18, -10],
                    [30, -11],
                  ].map(([n, r], i) =>
                    ReactDecors.default.createElement("path", {
                      key: i,
                      d: `M${n} ${r}l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z`,
                      className: "amb-lueur",
                    }),
                  ),
                ),
              ),
            )
          : null;
function yC({ id: id }) {
  let e = wr[id];
  if (!e) return null;
  let n = e.village;
  return ReactDecors.default.createElement(
    "div",
    { className: "decor-magie amb2-intro", style: { background: n.ciel }, "aria-hidden": "true" },
    !n.jour &&
      ReactDecors.default.createElement(
        "div",
        { className: "amb-intro-h" },
        ReactDecors.default.createElement("div", { className: "amb-etoiles" }),
      ),
    n.astre &&
      ReactDecors.default.createElement("div", { className: "amb2-astre", style: { background: n.astre } }),
    n.feux && ReactDecors.default.createElement(DecorAne, { id: id, apercu: !0 }),
    e.scene && e.vol !== "feux" && ReactDecors.default.createElement(DecorAne, { id: id, apercu: !0 }),
    id === "stnicolas" &&
      ReactDecors.default.createElement(
        "div",
        { className: "amb2-ane apercu passe" },
        ReactDecors.default.createElement(mC, null),
      ),
    id === "beaujolais" && ReactDecors.default.createElement(DecorAne, { id: "beaujolais", apercu: !0 }),
    e.scene ? e.scene(n) : ReactDecors.default.createElement(VillageBeaujolais, { id: id, v: n }),
  );
}
