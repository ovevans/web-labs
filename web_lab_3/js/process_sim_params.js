/*
  Design, text, images and code by Richard K. Herz, 2017-2018
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

  title : 'Reactor T control with Tj inlet', // title of simulation

  // valid values for labType are 'Dynamic' (default), or any other value
  // if not specified or set to '', 0, or false, then gets set to 'Dynamic' in controller
  // if then set to 'Dynamic', then controller.updateProcess is called repeatedly on Run
  // if is set to any other value, controller.updateProcess is called once on Run
  labType : 'Dynamic',

  runButtonID : "button_runButton", // for functions to run, reset, copy data
  // URLs for methods updateRunCount and updateCurrentRunCountDisplay below
  runLoggerURL : "../webAppRunLog.lc",
  runCurrrentRunCountURL : "../webAppCurrentCount.lc",

  // all units use simParams.simTimeStep, getting it at each step in unit updateInputs()
  // see method changeSimTimeStep() below to change simTimeStep value
  // WARNING: DO NOT CHANGE simTimeStep BETWEEN display updates

  simStepRepeats : 20, // integer number of unit updates between display updates
  simTimeStep : 0.1, // time step value, simulation time, of main repeat

  // individual units may do more steps in one unit updateState()
  // see individual units for any unitTimeStep and unitStepRepeats

  // set updateDisplayTimingMs to 50 ms because runs too fast on fast desktop
  // and 50 ms gives about same speed as 0 ms on my laptop
  updateDisplayTimingMs : 50, // real time milliseconds between display updates

  changeSimTimeStep : function(factor) {
    // WARNING: do not change simTimeStep except immediately before or after a
    // display update in order to maintain sync between sim time and real time
    this.simTimeStep = factor * this.simTimeStep;
  },

  // WARNING: NEED LITERAL, e.g., "field_run_counter" in methods below
  //      e.g., this.runCounterFieldID does NOT work

  updateRunCount : function() {
    // WARNING: NEED LITERAL, e.g., "field_run_counter" below
    //      e.g., this.runCounterFieldID does NOT work
    //
    $.post(this.runLoggerURL,{webAppNumber: "3, Reactor T control with Tj inlet"})
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

}; // END simParams object
