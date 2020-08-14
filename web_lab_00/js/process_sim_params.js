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
  //
  // OBJECT controller CAN CHANGE in object simParams the following:
  //    variable simTimeStep in method controller.changeSimTimeStep
  //

  title : 'Pendulum', // title of simulation

  runButtonID : "button_runButton", // required for interfacer object methods
  // URLs for methods updateRunCount and updateCurrentRunCountDisplay below
  runLoggerURL : "../webAppRunLog.lc",
  runCurrrentRunCountURL : "../webAppCurrentCount.lc",

  // all units use simParams.simTimeStep, getting it at each step in unit updateInputs()
  // see method simParams.changeSimTimeStep() below to change simTimeStep value
  // WARNING: DO NOT CHANGE simTimeStep BETWEEN display updates

  simStepRepeats : 5, // 20, // integer number of unit updates between display updates
  simTimeStep : 0.0005, // time step value, simulation time, of main repeat

  // individual units may do more steps in one unit updateState()
  // see individual units for any unitTimeStep and unitStepRepeats

  // set updateDisplayTimingMs to 50 ms because runs too fast on fast desktop
  // and 50 ms gives about same speed as 0 ms on my laptop
  displayTimingMs : 20, // real time milliseconds between display updates

  // WARNING: NEED LITERAL, e.g., "field_run_counter" in methods below
  //      e.g., this.runCounterFieldID does NOT work

  updateRunCount : function() {

    // console.log('sim_params, updateRunCount deactivated');

    // WARNING: NEED LITERAL, e.g., "field_run_counter" below
    //      e.g., this.runCounterFieldID does NOT work
    //
    $.post(this.runLoggerURL,{webAppNumber: "00, Pendulum"})
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

  // GETTERS & SETTERS SO NO DIRECT ACCESS TO THESE VARIABLES:
  //
  get getLabType() {return this.labType;},
  get getTitle() {return this.title;},
  get getSimStepRepeats() {return this.simStepRepeats;},
  get getSimTimeStep() {return this.simTimeStep;},
  get getSimTimeUnits() {return this.simTimeUnits;},
  get getDisplayTimingMs() {return this.displayTimingMs;},
  get getOldDataFlag() {return this.oldDataFlag;},
  //
  set setLabType(labtype) {this.labType = labtype;}, // var names case sensitive
  set setSimTimeStep(timestep) {this.simTimeStep = timestep},
  
}; // END simParams object
