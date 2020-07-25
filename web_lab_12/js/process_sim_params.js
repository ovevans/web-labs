/*
  Design, text, images and code by Richard K. Herz, 2017-2020
  Copyrights held by Richard K. Herz
  Licensed for use under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

let simParams = {
  //
  // ----- DEFINE LAB-SPECIFIC SIMULATION PARAMETERS ---------
  //
  // process unit objects USE object simParams:
  //    GET simParams.simTimeStep
  //
  // OBJECT controller USES in object simParams the following:
  //    function updateCurrentRunCountDisplay()
  //    function checkForSteadyState()
  //    variables simTimeStep, simStepRepeats, updateDisplayTimingMs
  //
  // OBJECT controller CAN CHANGE in object simParams the following:
  //    variable simTimeStep in method controller.changeSimTimeStep
  //

  title : 'Batch Reactor, isothermal, nth order reaction', // title of simulation

  labType : 'Single', // valid values are: Single, Profile, Dynamic (default)

  runButtonID : "button_runButton", // for functions to run, reset, copy data
  // URLs for methods updateRunCount and updateCurrentRunCountDisplay below
  runLoggerURL : "../webAppRunLog.lc",
  runCurrrentRunCountURL : "../webAppCurrentCount.lc",

  // all units use simParams.simTimeStep, getting it at each step in unit updateInputs()
  // see method simParams.changeSimTimeStep() below to change simTimeStep value
  // WARNING: DO NOT CHANGE simTimeStep BETWEEN display updates

  simStepRepeats : 1, // integer number of unit updates between display updates
  simTimeStep : 1, // time step value, simulation time, of main repeat

  // individual units may do more steps in one unit updateState()
  // see individual units for any unitTimeStep and unitStepRepeats

  // set updateDisplayTimingMs to 50 ms because runs too fast on fast desktop
  // and 50 ms gives about same speed as 0 ms on my laptop
  updateDisplayTimingMs : 100, // real time milliseconds between display updates

  // WARNING: NEED LITERAL, e.g., "field_run_counter" in methods below
  //      e.g., this.runCounterFieldID does NOT work

  updateRunCount : function() {
    // WARNING: NEED LITERAL, e.g., "field_run_counter" below
    //      e.g., this.runCounterFieldID does NOT work
    //
    $.post(this.runLoggerURL,{webAppNumber: "11, Batch reactor, isothermal, nth order reaction"})
      .done(
        function(data) {
          // document.getElementById("field_run_counter").innerHTML = "<i>Total runs = " + data + "</i>";
        } // END OF function(data)
      ) // END OF .done(
  }, // END OF updateRunCount

  updateCurrentRunCountDisplay : function() {
    // WARNING: NEED LITERAL, e.g., "field_run_counter" below
    //      e.g., this.runCounterFieldID does NOT work
    // $.post(this.runCurrrentRunCountURL) .done(function(data) {
      // document.getElementById("field_run_counter").innerHTML = "<i>Total runs = " + data + "</i>"; } );
  },

  // SPECIAL - LAB TYPE SINGLE
  // assume only one unit and one plot in this lab
  // these xVar, yVar values should agree with initial selected values in html
  // can't use document.getElementById() because this script loads before html
  xVar : 6,
  yVar : 8,
  // called onchange of html select element id='selectXvar'
  selectXvar : function() {
        this.xVar = document.getElementById("selectXvar").value;
        let pnum = 0; // plot index, assume only one plot on this page
        let unum = 0; // unit index, assume only one unit on this page
        plotInfo[pnum]['xAxisMin'] = processUnits[unum]['dataMin'][this.xVar];
        plotInfo[pnum]['xAxisMax'] = processUnits[unum]['dataMax'][this.xVar];
        let data = plotter.getPlotData(pnum);
        plotter.plotArrays['plotFlag'][pnum] = 0; // force axes redraw
        plotter.plotPlotData(data, pnum);
  },
  // called onchange of html select element id='selectYvar'
  selectYvar : function() {
        this.yVar = document.getElementById("selectYvar").value;
        let pnum = 0; // plot index, assume only one plot on this page
        let unum = 0; // unit index, assume only one unit on this page
        plotInfo[pnum]['yLeftAxisMin'] = processUnits[unum]['dataMin'][this.yVar];
        plotInfo[pnum]['yLeftAxisMax'] = processUnits[unum]['dataMax'][this.yVar];
        let data = plotter.getPlotData(pnum);
        plotter.plotArrays['plotFlag'][pnum] = 0; // force axes redraw
        plotter.plotPlotData(data, pnum);
  },

}; // END simParams object
