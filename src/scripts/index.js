
"use strict";
// class function scroll [Chart Components]
class Scroll extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const root = this.shadowRoot;
    root.innerHTML = `
  <div id = 'scroll-bar'>
   <div id = 'header-bar'></div>
   <div id = 'perc-0'>0%</div>
   <div id = 'bar-line'>
    <div id = 'blue-msg'>Some text for the user</div>
    <div id = 'red-msg'>Some text for the user</div>
    <div id = 'blue-cic'></div>
    <div id = 'red-cic'></div>
  </div>
  <div id = 'perc-100'>100%</div>
</div>
<style>
  #scroll-bar {
    width: 60vw;
    height: 50px;
    margin: 8px;
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    transition: 0.5s ease-out;
  }
  #blue-msg {
    width: 200px;
    height: 50px;
    padding: 10px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: 30px;
    border-radius: 10px;
    transform: scale(0);
    transition: 0.5s ease-out;
    z-index: 4;
    border:2px solid #212121;
    background-color: #ffffff;
  }
  #red-msg {
    width: 200px;
    height: 50px;
    padding: 10px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: 30px;
    border-radius: 10px;
    transform: scale(0);
    transition: 0.5s ease-out;
    z-index: 4;
    border:2px solid #212121;
    background-color: #ffffff;
  }
  #blue-msg::after{
  content: '';
  width: 20px;
  height: 20px;
  border: 2px solid #212121;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-bottom: -12px;
  transform: rotate(45deg);
  border-left: 0px;
  border-top: 0px;
  background-color: #ffffff;
  }
  #red-msg::after {
  content: '';
  width: 20px;
  height: 20px;
  border: 2px solid #212121;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-bottom: -12px;
  transform: rotate(45deg);
  border-left: 0px;
  border-top: 0px;
  background-color: #ffffff;
  }
  #header-bar {
    display: flex;
    justify-content: left;
    align-items: left;
    width: 20%;
    font-family: 'Alatsi';
    color: #212121;
    font-size: 20px;
    cursor: pointer;
  }
  #perc-0 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5%;
    color: #212121;
  }
  #per-100 {
    color: #212121;
  }
  #bar-line {
    display: flex;
    position: relative;
    border-bottom: 1px dashed grey;
    align-items: center;
    width: 70%;
  }
  #blue-cic {
    width: 12px;
    height: 12px;
    border: 2px solid royalblue;
    border-radius: 100%;
    position: absolute;
    cursor: grab;
    z-index: 5;
  }
  #red-cic {
    width: 12px;
    height: 12px;
    border: 2px solid red;
    border-radius: 100%;
    position: absolute;
    cursor: grab;
    z-index: 5;
    left:50%;
  }
</style>
    `;
    const barContainer = this.shadowRoot.getElementById('scroll-bar');
    const perc0 = this.shadowRoot.getElementById('perc-0');
    const perc100 = this.shadowRoot.getElementById('perc-100');
    const blueCic = this.shadowRoot.getElementById('blue-cic');
    const redCic = this.shadowRoot.getElementById('red-cic');
    const line = this.shadowRoot.getElementById('bar-line');
    const userMsgBlue = this.shadowRoot.getElementById('blue-msg');
    const userMsgRed = this.shadowRoot.getElementById('red-msg');
    const headUser = this.shadowRoot.getElementById('header-bar');
    const botExport = document.getElementById('message');

    headUser.onclick = function(e) {
      e.stopPropagation();
      bot.style.marginRight = '-80px';
      botMes.textContent = this.textContent + '.......';
    }
    
    blueCic.onmousedown = function(e) {
      
    blueCic.style.zIndex = 3;
    redCic.style.zIndex  = 1;
    barContainer.onmousemove = function(e) {
      
      this.style.boxShadow = '0px 0px 10px 10px lightgray';
      if (e.pageX <= line.getBoundingClientRect().left) {
        barContainer.onmousemove = false;
        perc0.ondrag = false;
        this.style.boxShadow = '0px 0px 0px 0px #ffffff';
          return;
      }
      if (e.pageX >= line.getBoundingClientRect().left + line.clientWidth) {
        barContainer.onmousemove = false;
        perc100.ondrag = false;
        this.style.boxShadow = '0px 0px 0px 0px #ffffff';
        return;
      }
       userMsgBlue.style.transform = 'scale(1)';
       userMsgBlue.style.left = e.pageX- line.getBoundingClientRect().left - userMsgBlue.clientWidth / 2+ 'px';

       setTimeout(function(){
        blueCic.style.left = e.pageX - line.getBoundingClientRect().left - blueCic.clientWidth / 2 + 'px';

      }, 260); // this delay is added because when we drag circle, the messgae block above it was dragging little late, hence delay to drag of circle

    }
    blueCic.onmouseup = () => {
      barContainer.onmousemove = null;
      barContainer.style.boxShadow = '0px 0px 0px 0px #ffffff';
      userMsgBlue.style.transform = 'scale(0)';
      // botExport.innerHTML = `<b> Do you want export your data ? <p id = 'ex-app' onclick = 'openAppExportData();'>Click here</p> </b> <br>`;
       // Currently below code is hidden, for exporting to csv, it shall be turned on request
      //botExport.innerHTML = `<b> Do you want export your data ? <p id = 'ex-app' >Scroll Down</p> </b> <br>`;
    } 
   }

   redCic.onmousedown = function(e) {
    
    blueCic.style.zIndex = 1;
    redCic.style.zIndex  = 3;
    barContainer.onmousemove = function(e) {
      
      this.style.boxShadow = '0px 0px 10px 10px lightgray';
      if (e.pageX <= line.getBoundingClientRect().left) {
        barContainer.onmousemove = false;
        perc0.ondrag = false;
        this.style.boxShadow = '0px 0px 0px 0px #ffffff';
          return;
      }
      if (e.pageX >= line.getBoundingClientRect().left + line.clientWidth) {
        barContainer.onmousemove = false;
        perc100.ondrag = false;
        this.style.boxShadow = '0px 0px 0px 0px #ffffff';
        return;
      }
       userMsgRed.style.transform = 'scale(1)';
       userMsgRed.style.left = e.pageX- line.getBoundingClientRect().left - userMsgBlue.clientWidth / 2+ 'px';

       setTimeout(function(){

        redCic.style.left = e.pageX - line.getBoundingClientRect().left - redCic.clientWidth / 2 + 'px';
      }, 260); // this delay is added because when we drag circle, the messgae block above it was dragging little late, hence delay to drag of circle
      
    }
    redCic.onmouseup = () => {
      barContainer.onmousemove = null;
      barContainer.style.boxShadow = '0px 0px 0px 0px #ffffff';
      userMsgRed.style.transform = 'scale(0)';
      // botExport.innerHTML = `<b> Do you want export your data ? <p id = 'ex-app' onclick = 'openAppExportData()'>Click here</p> </b> <br>`;
     //Currently below code is hidden for making export to csv app visible it shall be turned on request
      // botExport.innerHTML = `<b> Do you want export your data ? <p id = 'ex-app' >Scroll Down</p> </b> <br>`;

    } 
   }
 }

  connectedCallback() {
    const barHeader = this.shadowRoot.getElementById('header-bar');
    barHeader.textContent = this.getAttribute('header');
  }
};

customElements.define('my-scroll', Scroll);

/***************************** */
class Chart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const root = this.shadowRoot;
    root.innerHTML = `
  <div id = 'chart-bar'>
   <div id = 'header-bar'></div>
   <div id = 'perc-0'>0%</div>
   <div id = 'bar-line'>
    <div id = 'blue-msg'>Some text for the user</div>
    <div id = 'red-msg'>Some text for the user</div>
    <div id = 'indicator'></div>
  </div>
  <div id = 'perc-100'>100%</div>
</div>
<style>

  #chart-bar {
    width: 60vw;
    height: 50px;
    margin: 8px;
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    transition: 0.5s ease-out;
  }
  #blue-msg {
    width: 200px;
    height: 50px;
    padding: 10px;
    background-color: #FFF8DC;
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: 30px;
    border-radius: 10px;
    transform: scale(0);
    transition: 0.5s ease-out;
    z-index: 4;
  }
  #red-msg {
    width: 200px;
    height: 50px;
    padding: 10px;
    background-color: #FFF8DC;
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: 30px;
    border-radius: 10px;
    transform: scale(0);
    transition: 0.5s ease-out;
    z-index: 4;
  }
  #blue-msg::after{
    content: '';
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 20px solid #FFF8DC;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    margin-top: 55px;
  }
  #red-msg::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 20px solid #FFF8DC;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    margin-top: 55px;
  }
  #header-bar {
    display: flex;
    justify-content: left;
    align-items: left;
    width: 20%;
    font-family: 'Alatsi';
    color: #212121;
    font-size: 20px;
  }
  #perc-0 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5%;
    color: #212121;
  }
  #perc-100 {
    color: #212121;
  }
  #bar-line {
    display: flex;
    border-bottom: 1px dashed grey;
    align-items: center;
    width: 70%;
  }
  #indicator {
    width: 0%;
    height: 5px;
    border-radius: 10px;
    cursor: grab;
    z-index: 5;
    position: absolute;
  }
 
</style>
    `;
 }
  connectedCallback() {
    const barHeader = this.shadowRoot.getElementById('header-bar');
    barHeader.textContent = this.getAttribute('header');
  }
};

customElements.define('my-chart', Chart);
// Global varibales shared between applications...................
const [section1, art, chart, pop1, pop2, bot, botMes, chart2, section2, exportBox] = [
  document.getElementsByClassName('sec_1')[0],
  document.getElementsByTagName('article')[0],
  document.getElementsByClassName('box-chart')[0],
  document.getElementsByClassName('pop_1')[0],
  document.getElementsByClassName('pop_2')[0],
  document.getElementById('chatbot'),
  document.getElementById('message'),
  document.getElementsByClassName('box-chart-2')[0],
  document.getElementsByClassName('sec_2')[0],
  document.getElementById('data-export-container')
];

// scrolling algorithms for certain events........................
const agentScreen = window.screen.availHeight;
window.onscroll = function() {
  bot.style.marginRight = '-550px';
  if (section1.getBoundingClientRect().top < agentScreen - 250) {
    bot.style.marginRight = '-80px';
    exportBox.style.marginLeft= '-550px';
    botMes.textContent = 'Introduction about chart'
  } 

  if (document.documentElement.getBoundingClientRect().top >=0) {
    bot.style.marginRight = '-550px';
    exportBox.style.marginLeft= '-550px';
  }

  if (document.documentElement.scrollTop >= art.clientHeight) {
    section1.classList.add('fixd');
    bot.style.marginRight = '-80px';
    exportBox.style.marginLeft= '-550px';
    botMes.textContent = 'Introduction about chart'
  } else {
    section1.classList.remove('fixd');
  }
  if (pop2.getBoundingClientRect().top < window.screen.availHeight) {
    // adding jQuery for smooth fadeIn/Out
   $('.box-chart').fadeOut(500);
   $('.box-chart-2').fadeIn(500);
   bot.style.marginRight = '-550px';
  } else {
   $('.box-chart-2').fadeOut(500);
   $('.box-chart').fadeIn(500);
  }
   //Currently below code is hidden for making export to csv app visible it shall be turned on request
   //exportBox.style.marginLeft= '0px';
  if (pop2.getBoundingClientRect().top <= 0) {
    botMes.textContent = 'This a data visulization';
    bot.style.marginRight = '-550px';
    exportBox.style.marginLeft= '-550px';
  }

  // data visualization animation.................................

  
 if (section2.getBoundingClientRect().top <= 100) {
   $('data-view:eq(0)').show(1000);
   this.setTimeout( () => $('data-view:eq(1)').show(1000), 2500);
   this.setTimeout( () => $('data-view:eq(2)').show(1000), 4500);
   this.setTimeout( () => $('data-view:eq(3)').show(1000), 7000);
 }
};

// Analyzing data in chart..................................
function geoData() {
  const arr = [
    {blue: '', red: ''},
    {blue: '', red: ''},
    {blue: '', red: ''},
    {blue: '', red: ''},
    {blue: '', red: ''},
    {blue: '', red: ''},
    {blue: '', red: ''},
    {blue: '', red: ''},
    {blue: '', red: ''}
  ];
  
  const scroll_chart = document.getElementsByTagName('my-scroll');
  const result_chart = document.getElementsByTagName('my-chart');

  for (let i = 0; i < arr.length; i++) {
    let sum_red = scroll_chart[i].shadowRoot.getElementById('red-cic').getBoundingClientRect().left;
    let total_red = (sum_red * 100 / document.documentElement.clientWidth);
    let fix_red = parseFloat(total_red).toFixed(0);

    let sum_blue = scroll_chart[i].shadowRoot.getElementById('blue-cic').getBoundingClientRect().left;
    let total_blue = sum_blue * 100 / document.documentElement.clientWidth;
    let fix_blue= parseFloat(total_blue).toFixed(0);

    let diff = Math.abs(fix_blue - fix_red);

    if (fix_blue > fix_red) {
      result_chart[i].shadowRoot.getElementById('indicator').style.backgroundColor = 'royalblue';
      result_chart[i].shadowRoot.getElementById('indicator').style.width = `${diff}%`;
      result_chart[i].shadowRoot.getElementById('indicator').style.left = `${total_red}%`;
    } else {
      result_chart[i].shadowRoot.getElementById('indicator').style.backgroundColor = 'red';
      result_chart[i].shadowRoot.getElementById('indicator').style.width = `${diff}%`;
      result_chart[i].shadowRoot.getElementById('indicator').style.left = `${total_blue}%`;
    }
  }
};

// calling geoData function for analyzing data.......................
const chartTable = document.getElementsByClassName('box-chart')[0];
chartTable.onmousedown = function() {
  this.onmouseup = function() {
   return geoData();
  }
};

// function light to turn on/off night reading mode.....................
function light() {
  this.parentElement.parentElement.classList.toggle('turnLight');
 if (this.children[0].classList.contains('fa-moon')) {
  this.children[0].classList.remove('fa-moon');
  this.children[0].classList.add('fa-lightbulb');
} else {
  this.children[0].classList.add('fa-moon');
  this.children[0].classList.remove('fa-lightbulb');
}
};

const te = document.getElementsByClassName('sgs');

for (let i = 0; i < te.length; i++) {
  te[i].addEventListener('click', light, false);
};

//Data tree.....................................

const dataCustomer = [
  'Customer satisfaction & Perception',
  'Business and IT Strategy Alignment and Integration',
  '360 View of the Customer',
  'Social & Mobile Customer Interactions (omni-channel, real-time)',
  'Customer Journey & Experienced-led Design Approach'
];
const dataCustomer_lagging = [
  'Reactive and Slow Time to Market​',
  'Independently Developed Business and IT Strategies',
  'Low Customer Satisfaction'
];
const dataBusiness_value = [
  'Value Tracking & Realization',
  'Optimized Technology Operating Cost',
  'Ability to Self-fund Strategic/New Initiatives from Cost Savings',
  'Speed and Rapid Response to Market',
  'M&A Capabilities'
];
const dataBusiness_valueLagging = [
  'Unresolved Tech Debt​',
  'Different Metrics for Business and IT ​',
  'High IT Operating Cost​'
];
const operatingModel = [
  'Flexible, Agile, Responsive',
  'Self-organizing and Agile Teaming',
  'Ecosystem Partnering (platform, SI, academia, start ups)',
  'Supports Multiple Business Models',
  'Distributed Product-centric Operating Model'
];
const operatingModel_lagging = [
  'Siloed and Project-driven​',
  'Shadow IT in Pockets​',
  'Hierarchical and Complex Governance Model​'
];
const workForce_skills = [
  'Engaged and Motivated Employees',
  'Adaptive Workforce & Talent Strategy​',
  'Digital and Emerging Tech Training & Upskilling​',
  'Optimized Utilization of Talent​',
  'Attracts New Skills and People​',
  'Workforce Aligned to Growth Initiatives​',
  'Senior Leaders Trust Employees and Enable Entrepreneurial Mindset​'
];
const workForce_skillsLagging = [
  'Low Employee Engagement and High Attrition​',
  'Lack of or Limited Talent Strategy​',
  'Lack of or Limited Digital and Emerging Technology Training ​'
];
const operationsDelivery = [
  'On-time and On-budget Delivery​',
  'Monitors & Improves Code Quality and Defect Density​',
  'Monitors & Improves Efficiency & Productivity',
  'Lean and Integrated DevOps Delivery (CI/CD)​',
  'System Availability & Reliability ​',
  'Formalized SLA Definition and Management Process'
];
const operationsDelivery_lagging = [
  'Structured, Linear Processes (Waterfall)​',
  'Limited Automation in Testing & Deployment​',
  'Poor Delivery Quality (Often Delayed, High Budget Variance)'
];
const techCapabilities = [
  'Decoupled, Open and, Modular Architecture​',
  'Cloud First Principle for Full Technology Stack​',
  'Intelligent and Agile Infrastructure & Network Provisioning',
  'Enterprise Adoption of APIs & Microservices Ecosystem​',
  'Platform Development & Orchestration Focused​',
  'Lean Product Management and Small Batching',
  'Cloud Strategy & Planning​'
];
const techCapabilities_lagging = [
  'Legacy Dependent​',
  'Complex and Disparate Application Landscape​',
  'Monolithic and Inflexible Systems/ Architectures​',
  'On Premise Technology with SaaS in pockets',
  'Poorly Defined Cloud Strategy or Journey to Cloud'
];
const secCompaliance = [
  'Resiliency against Security Breache',
  'Proactive Cybersecurity Approach​',
  'Rapid Security Incident Resolution',
  'Trustworthy, Ethical and Responsible Practices/Policies​'
];
const secCompaliance_lagging = [
  'Reactive and Risk Mitigation Focused',
  'Major Security Breaches and Incidents​'
];
const innovation = [
  'Defined Innovation Functions​',
  'nnovation Embedded into Culture and Processes​',
  'ntelligent Automation & Augmentation​',
  'Ability to Innovate at Scale​',
  'Brings Innovation to Core Faster​'
];
const innovation_lagging = [
  'Ad-hoc Innovation by “Accident”​',
  'Lack of or Limited Investment Funding​'
];
const dataAnalytics = [
  'Data Seen as a Strategic Asset​',
  'Formalized Data & Analytics Function and Centralized Data Governance​',
  'Data-driven & Insight-led Real-time or Timely Decisions​',
  'Adoption of Data-driven Services and Products​',
  'Data Integrated to Innovation platform​'
];
const dataAnalytics_lagging = [
  'Poor and Inconsistent Data Quality​',
  'Siloed and Decentralized Data and Analytics Capabilities',
  'Low Utilization of Data-driven Insights for Decision Making',
  'Low Trust in Data​'
];

// Data visualization class components...........................................

class DataHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const root = this.shadowRoot;
    root.innerHTML = `
    <div id = 'container'>
    <div id = 'view'>
    <div id = 'header'>
    <span id = 'header-w'></span>
    </div>
    <div id = 'data-view'>
    <slot name = 'sub_1'></slot>
    <slot name = 'sub_2'></slot>
    </div>
    </div>
    </div>
    <style>
    #container {
      width: 50vw;
      height: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 25px;
      margin-left: 0;
    }
    #view {
      width: 85%;
      height: 90%;
      display: flex;
      position: relative;
    }
    #header {
      display: flex;
      width: 18%;
      height: 100%;
      border-right: 2px solid #212121;
      position: relative;
      justify-content: center;
      align-items: center;
    }
    #header-w {
      width: 100%;
      position: absolute;
     // font-weight: bold;
      color: #212121;
      // border-bottom: 2px solid #212121;
      text-align: center;
      font-family:Alatsi;
    }
    #data-view {
      width: 80%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    </style>
        `;
  }
  connectedCallback() {
    const header = this.shadowRoot.getElementById('header-w');
    header.textContent = this.getAttribute('header');
    const componentHeight = this.getAttribute('row');
    const theHeight = componentHeight * 100;
    this.shadowRoot.getElementById('container').style.height = `${theHeight +20}px`;
  }
  static get observedAttributes() {
    return ['row'];
  }
};

customElements.define('data-view', DataHeader);

/********************** */
class SubHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const root = this.shadowRoot;
    root.innerHTML = `
    <div id = 'container'>
    <div id = 'sub-info'></div>
    <div id = 'data-row'>
    </div>
    
    <div id = 'sub-container'>
    
    <div id = 'sub-header'></div>
    
    </div>
    </div>
    <style>
    #container {
      width: 100%;
      height: 80px;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
    }
    .item {
      width: 100px;
      height: 60px;
      background-color: #E3E4FA;
      border-right: 1px solid #ffffff;
      transition: 0.5s ease-out;
      cursor: crosshair;
      font-size: small;
      font-family:Alatsi;
      display: flex;
      word-wrap: break-word;
      overflow: hidden;
      justify-content: center;
      z-index: 10;
      transition: 0.5s ease-in;
      opacity: 0.5;
    }
    .item:hover {
      opacity: 1;
    }
    
    .item-lagging {
      width: 100px;
      height: 60px;
      background-color: #F75D59;
      border-right: 1px solid #ffffff;
      transition: 0.5s ease-out;
      cursor: crosshair;
      font-size: small;
      font-family:Alatsi;
      display: flex;
      word-wrap: break-word;
      overflow: hidden;
      justify-content: center;
      z-index: 10;
      transition: 0.5s ease-in;
      opacity: 0.5;
    }
    .item-lagging:hover {
      opacity: 1;
    }
    
    #data-row {
      width: 100%;
      height: 80px;
      display: flex;
      flex-wrap: nowrap;
    }
    #sub-container {
      width: 100%;
      height: 20px;
      display: flex;
    }
    #sub-header {
      width: 50%;
      display: flex;
      //font-weight: bold;
      color: #212121;
      font-family:Alatsi;
    }
    #sub-info {
      width: 100%;
      display: flex;
      justify-content: center;
      color: #454442;
      margin-bottom: 5px;
      font-family:Alatsi;
    }
    .cool {
      width: 100%;
    }
    
    </style>
    `;
    const rowOps = this.shadowRoot.getElementById('data-row');
    const dataInfo = this.shadowRoot.getElementById('sub-info');

   rowOps.onmouseover = function(e) {
     if (e.target.className != 'item' && e.target.className != 'item-lagging') {
      dataInfo.textContent = '';
      return;
     }
     this.onmouseout = function(e) {
       e.target.classList.remove('cool');
       dataInfo.textContent = '';
     }
     e.relatedTarget.classList.remove('cool');
     e.target.classList.add('cool');
     dataInfo.textContent = e.target.textContent;
   }
  } 
  
  connectedCallback() {
    const subHeader = this.shadowRoot.getElementById('sub-header');
    const dataRow = this.shadowRoot.getElementById('data-row');
    subHeader.textContent = this.getAttribute('sub-header');
    const dataFlow = this.getAttribute('data-flow');
   
    switch(dataFlow) {
      case 'customer':
      for (let i = 0; i < dataCustomer.length; i++) {
        let data = document.createElement('div');
        data.textContent = dataCustomer[i];
        data.classList.add('item');
        dataRow.append(data);
      }
      for (let i = 0; i < dataCustomer_lagging.length; i++) {
        let data = document.createElement('div');
        data.textContent = dataCustomer[i];
        data.classList.add('item-lagging');
        dataRow.append(data);
      }
      break;
      case 'business':
      for (let i = 0; i < dataBusiness_value.length; i++) {
        let data = document.createElement('div');
        data.textContent = dataBusiness_value[i];
        data.classList.add('item');
        dataRow.append(data);
      }
      for (let i = 0; i < dataBusiness_valueLagging.length; i++) {
        let data = document.createElement('div');
        data.textContent = dataCustomer[i];
        data.classList.add('item-lagging');
        dataRow.append(data);
      }
      break;
      case 'operating':
      for (let i = 0; i < operatingModel.length; i++) {
        let data = document.createElement('div');
        data.textContent = operatingModel[i];
        data.classList.add('item');
        dataRow.append(data);
      }
      for (let i = 0; i < operatingModel_lagging.length; i++) {
        let data = document.createElement('div');
        data.textContent = dataCustomer[i];
        data.classList.add('item-lagging');
        dataRow.append(data);
      }
      break;
      case 'workforce':
      for (let i = 0; i < workForce_skills.length; i++) {
        let data = document.createElement('div');
        data.textContent = workForce_skills[i];
        data.classList.add('item');
        dataRow.append(data);
      }
      for (let i = 0; i < workForce_skillsLagging.length; i++) {
        let data = document.createElement('div');
        data.textContent = dataCustomer[i];
        data.classList.add('item-lagging');
        dataRow.append(data);
      }
      break;
      case 'exellence':
      for (let i = 0; i < operationsDelivery.length; i++) {
        let data = document.createElement('div');
        data.textContent = operationsDelivery[i];
        data.classList.add('item');
        dataRow.append(data);
      }
      for (let i = 0; i < operationsDelivery_lagging.length; i++) {
        let data = document.createElement('div');
        data.textContent = dataCustomer[i];
        data.classList.add('item-lagging');
        dataRow.append(data);
      }
      break;
      case 'technology':
      for (let i = 0; i < techCapabilities.length; i++) {
        let data = document.createElement('div');
        data.textContent = techCapabilities[i];
        data.classList.add('item');
        dataRow.append(data);
      }
      for (let i = 0; i < techCapabilities_lagging.length; i++) {
        let data = document.createElement('div');
        data.textContent = dataCustomer[i];
        data.classList.add('item-lagging');
        dataRow.append(data);
      }
      break;
      case 'security':
      for (let i = 0; i < secCompaliance.length; i++) {
        let data = document.createElement('div');
        data.textContent = secCompaliance[i];
        data.classList.add('item');
        dataRow.append(data);
      }
      for (let i = 0; i < secCompaliance_lagging.length; i++) {
        let data = document.createElement('div');
        data.textContent = dataCustomer[i];
        data.classList.add('item-lagging');
        dataRow.append(data);
      }
      break;
      case 'innovation':
      for (let i = 0; i < innovation.length; i++) {
        let data = document.createElement('div');
        data.textContent = innovation[i];
        data.classList.add('item');
        dataRow.append(data);
      }
      for (let i = 0; i < innovation_lagging.length; i++) {
        let data = document.createElement('div');
        data.textContent = dataCustomer[i];
        data.classList.add('item-lagging');
        dataRow.append(data);
      }
      break;
      case 'analytics':
      for (let i = 0; i < dataAnalytics.length; i++) {
        let data = document.createElement('div');
        data.textContent = dataAnalytics[i];
        data.classList.add('item');
        dataRow.append(data);
      }
      for (let i = 0; i < dataAnalytics_lagging.length; i++) {
        let data = document.createElement('div');
        data.textContent = dataCustomer[i];
        data.classList.add('item-lagging');
        dataRow.append(data);
      }
      default: return;
    }
  }
}


customElements.define('data-row', SubHeader);
//...........................................................

// Export data application...................................

const tso = document.getElementById('file-name-input');
const [fileName, fileExtension, userMsg, gifEx] = [
  document.getElementById('file-name-input'),
  document.getElementById('file-select'),
  document.getElementById('middle'),
  document.getElementById('gif')
];

function openAppExportData() {
  $('#data-export-container').css('margin-left', '0px');
  const app = document.getElementById('data-export-container');
  app.style.transform = 'scale(1)';
  fileName.focus();
};

function data_ex() {
  if (!tso.value) {
    userMsg.textContent = '*Please write your file name';
    return;
  }
  userMsg.textContent = '';
  
  const data_component = document.getElementsByTagName('my-scroll');
  const measure = data_component[0].shadowRoot.getElementById('bar-line');
  const [header_data, competitors_data, you_data] = [ [], [], [] ];
  for (let i = 0; i < data_component.length; i++) {
    const firstInit_red = data_component[i].shadowRoot.getElementById('red-cic').getBoundingClientRect().left - measure.getBoundingClientRect().left;
    const secInit_red = firstInit_red * 100 / measure.clientWidth;
    competitors_data.push(parseFloat(secInit_red).toFixed(0) + '%');
    header_data.push(data_component[i].shadowRoot.getElementById('header-bar').textContent);

    const firstInit_blue = data_component[i].shadowRoot.getElementById('blue-cic').getBoundingClientRect().left - measure.getBoundingClientRect().left;
    const secInit_blue= firstInit_blue * 100 / measure.clientWidth;
    you_data.push(parseFloat(secInit_blue).toFixed(0) + '%');
  }
  
  const csvHeaders = `Category, You, Competitors`
  const arr_structure = [csvHeaders];
  
  for (let x = 0; x < header_data.length; x++) {
   let runArray = [];
   runArray.push(header_data[x], you_data[x], competitors_data[x]);
   arr_structure.push(`\n${runArray}`);
  }
  
  const blob = new Blob([arr_structure], {type: `text/${fileExtension.value}`});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${tso.value}.${fileExtension.value}`;
  a.click();
  URL.revokeObjectURL(blob);
};

function cancel_data() {
  const app = document.getElementById('data-export-container');
  tso.value = '';
  userMsg.textContent = '';
  app.style.transform = 'scale(0)';
};

const userExportData = document.getElementById('file-btn-export');
userExportData.addEventListener('click', data_ex, false);

const userCancel = document.getElementById('file-btn-cancel');
userCancel.addEventListener('click', cancel_data, false);


// Graphs [D3.js Library]................................
const ele = document.getElementsByClassName('box-graph')[0];
const customer_data = [
  'Customer satisfaction & Perceptio', 'Business and IT Strategy Alignment and Integration',
  '360 View of the Customer', 'Social & Mobile Customer Interactions omni-channel, real-time',
  'Customer Journey & Experienced-led Design Approach', 'Customer satisfaction & Perception',
  'Business and IT Strategy Alignment and Integration', '360 View of the Customer',
  'Value Tracking & Realization', 'Optimized Technology Operating Cost',
  'Ability to Self-fund Strategic/New Initiatives from Cost Savings', 
  'Speed and Rapid Response to Market',
  'Measure', 'M&A Capabilities', 'Customer satisfaction & Perception',
  'Business and IT Strategy Alignment and Integration', '360 View of the Customer'
];
const points = `M 0 0 C 3 70 10 0 22 3 25 6 30 10 35 5 40 0 50 10 80 10 120 11 125 10 130 15 135 10 140 15 145 10 150 5
155 10 160 15 165 10 170 10 175 5 190 5 195 20 210 10 220 5 300 5 310 10 320 12 325 10 330 13 332 15`;
const x_ticks = [20, 40, 60, 80, 100];
const y_ticks = [20, 40, 60, 80, 100];

const scale_x = d3.scaleLinear()
.domain( [d3.min(x_ticks), d3.max(x_ticks)] )
.range( [0, 400] );

const scale_y = d3.scaleLinear()
.domain( [d3.min(y_ticks), d3.max(y_ticks)] )
.range( [0, 400] );

const axi_left = d3.axisLeft().scale(scale_y);
axi_left.tickValues([20, 40, 60, 80, 100]);

const axi_bottom = d3.axisBottom().scale(scale_x);
axi_bottom.tickValues([20, 40, 60, 80, 100]);

const svg = d3.select('.graph-view')
.append('svg')
.classed('graph-cool', true)

const axi_x = svg.append('g')
.attr('transform', 'translate(30, 420)')
.call(axi_bottom);

const axi_y = svg.append('g')
.attr('transform', 'translate(30, 20)')
.attr("stroke", "#ffffff")
.call(axi_left);

const g = svg.selectAll('.ax')
.data(customer_data)
.enter()
.append('g')
.classed('ax', true)
.attr('fill', 'transparent')
.attr('transform', (d, i) => {
  return "translate(33," + i * 20 + ")";
});


g.append('path')
.attr('d', points)
.attr('stroke', '#E5E4E2')
.attr('stroke-width', 2)
.on('mouseover', function(e) {
  e = window.event;
  d3.select(this).attr('stroke', '#666664');
  ele.classList.add('line-graph');
  ele.textContent = this.nextSibling.textContent;
  ele.style.left = e.pageX - ele.clientWidth / 2+ 'px';
  ele.style.top = e.pageY- 30 + 'px';
})
.on('mousemove', function(e) {
  e = window.event;
  d3.select(this).attr('stroke', '#666664');
  ele.classList.add('line-graph');
  ele.textContent = this.nextSibling.textContent;
  ele.style.left = e.pageX - ele.clientWidth / 2+ 'px';
  ele.style.top = e.pageY -30 + 'px';
})
.on('mouseout', function() {
  d3.select(this).attr('stroke', '#E5E4E2');
  ele.classList.remove('line-graph');
})

d3.selectAll('.ax')
.append('text')
.attr('x', '180')
.attr('y', '20')
.attr('dy', '.35em')
.text(d => d)

//red line measure...........
svg.append('line')
.attr('x1', '30')
.attr('y1', '250')
.attr('x2', '420')
.attr('y2', '250')
.style('stroke', 'red')


// graph data name.................
svg.append('text')
.text('PURPOSE')
.attr('x', '180')
.attr('y', '470')
.style('font-size', '18px')
.style('font-weight', 'bold')

//graph titles
/*
svg.a.append('text')
.attr('x', '5')
.attr('y', '100')
.attr('dy', '.35em')
.attr('transform', 'rotate(90)')
.text('Customer');
*/
svg.append('circle')
.attr('cx', '360')
.attr('cy', '250')
.attr('r', '12')
.attr('stroke', '#212121')
.attr('fill', 'transparent');

svg.append('line')
.attr('x1', '360')
.attr('y1', '250')
.attr('x2', '420')
.attr('y2', '200')
.attr('stroke-width', 3)
.attr('stroke', '#212121')
.attr('stroke-dasharray', '6')
.attr('stroke-dashoffset', '100')
.classed('ro', true);

// title path................
const titlePoints = `M 350 235 330 220 330 180 250 180`;
svg.append('path')
.attr('d', titlePoints)
.attr('stroke', '#959492')
.attr('fill', 'transparent')
.attr('stroke-width', 2);

// title text .................
svg.append('text')
.attr('x', 253).attr('y', 177)
.text('Progress')


// graph control..................
const lineGraph = document.getElementsByClassName('ro')[0];
const mainControl = document.getElementsByClassName('main-control')[0];
const pointGraph = document.getElementsByClassName('control-point')[0];
const linePoint = document.getElementsByClassName('control-line')[0];
const indicator = document.getElementsByTagName('line')[1];
const scale = Math.abs(indicator.getAttribute('y2'));
let i = 200;

pointGraph.onmousedown = function(e) {
  mainControl.onmousemove = true;
  const shiftX = e.clientX - ( pointGraph.getBoundingClientRect().left - mainControl.getBoundingClientRect().left );
  mainControl.onmousemove = function(e) {
    
    if (e.clientX > mainControl.getBoundingClientRect().left + mainControl.clientWidth - 13 || 
        e.clientX < mainControl.getBoundingClientRect().left + 10
    ) {
      return;
    }
    linePoint.style.left = e.clientX - shiftX + 'px';
    let x = e.clientX - mainControl.getBoundingClientRect().left -13;
    let dx = x * 100 / mainControl.clientWidth;
    let sum = i + dx;
    console.log(parseFloat(dx).toFixed(0));
    lineGraph.setAttribute('y2', sum);
    if (sum > 250) {
      lineGraph.setAttribute('stroke', 'red');
    } else {
      lineGraph.setAttribute('stroke', '#212121');
    }
  }
  
  this.onmouseup = function() {
    mainControl.onmousemove = null;
  }
  mainControl.onmouseup = function() {
    mainControl.onmousemove = null;
  }
  document.onmouseup = function() {
    mainControl.onmousemove = null;
  }
}
pointGraph.ondragstart = function() {
  return false;
};

