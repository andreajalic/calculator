window.addEventListener("DOMContentLoaded", init);

const options = [
  "*",
  "/",
  "+",
  "-",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
]; //all keys
const spec = ["*", "/", "-", "+"]; //special function keys
var name = "Calculator";

function init() {
  document.title = "JavaScript calculator";
  console.log("ready");

  let decimal = false;
  let evaluation = false;

  //splash
  const splash = document.querySelector(".splash");
  console.log(document.querySelector(".splash"));
  setTimeout(() => {
    splash.classList.add("display-none");
    console.log("timeout");
  }, 2000);

  // ----------- visual part -----------------------------
  document.body.style.display = "flex";

  const container = document.createElement("div");
  container.classList.add("container");
  container.style.maxWidth = "600px";
  container.style.margin = "auto";
  document.body.appendChild(container);

  const output = document.createElement("input");
  output.setAttribute("type", "text");
  output.placeholder = "0";
  output.classList.add("output");
  output.style.marginBottom = "1rem";
  output.style.width = "100%";
  output.style.border = "none";
  output.style.lineHeight = "50px";
  output.style.fontSize = "3em";
  output.style.borderBottom = "1px solid black";
  output.style.textAlign = "right";
  container.appendChild(output);

  const main = document.createElement("div");
  main.classList.add("main");
  main.style.width = "100%";
  container.appendChild(main);
  //--------------------------------------------------------

  //creating btns
  options.forEach(function (value) {
    //console.log('options:', value)
    btnMaker(value, addOutput);
  });

  //special btn functions
  btnMaker("=", evalOutput);
  btnMaker("C", clrOutput);

  //color alert
  function cOutput(val) {
    output.style.border = val + "1px solid";
    output.style.color = val;
  }

  function evalOutput() {
    cOutput("black");
    console.log("=");

    if (output.value === "") {
      cOutput("red"); //if there is no value - error
    } else if (evaluation) {
      //if special keys are the last value
      cOutput("red");
    } else {
      output.value = eval(output.value);
    }

    decimal = output.value.includes("."); //so that after eval we cant add additional decimal places if the result is already decimal
  }

  function clrOutput() {
    cOutput("black");
    output.value = "";
    decimal = false;
  }

  //buttons construction
  function btnMaker(text, myFunction) {
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.style.width = "23%";
    btn.style.border = "none";
    btn.style.lineHeight = "50px";
    btn.style.margin = "1%";
    btn.style.fontSize = "2em";
    btn.style.backgroundColor = "gray";
    btn.style.borderRadius = "10px";
    btn.value = text;
    btn.textContent = text;
    btn.addEventListener("click", myFunction);
    main.appendChild(btn);
  }

  function addOutput(e) {
    //console.log(decimal)
    cOutput("black");

    // console.log(e.target.value)
    let char = e.target.value;

    //check decimal places
    if (char == ".") {
      if (decimal) {
        char = "";
        cOutput("red");
      } else {
        decimal = true;
      }
    }

    evaluation = spec.includes(char);
    //for more decimal places
    if (evaluation) {
      decimal = false;
      console.log(evaluation, decimal);
    }
    output.value += char;
  }
}
