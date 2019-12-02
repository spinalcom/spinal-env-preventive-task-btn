var SpinalDrive_App = require("spinal-env-drive-core").SpinalDrive_App;

/**
 * SpinalDrive_App_FileExplorer_preventive-task_center
 * @extends {SpinalDrive_App}
 */
class SpinalDrive_App_FileExplorer_preventive_task_center extends SpinalDrive_App {
  /**
   * Creates an instance of SpinalDrive_App_FileExplorer_preventive-task_center.
   * @memberof SpinalDrive_App_FileExplorer_preventive-task_center
   */
  constructor() {
    super(
      "Openpreventive-taskFileExplorer",
      "ST Preventive",
      10,
      "insert_invitation",
      "Open ST Preventive"
    );
    this.order_priority = 5;
  }
  /**
   * method to handle the selection
   *
   * @param {any} element
   * @memberof SpinalDrive_App_FileExplorer_preventive-task_center
   */
  action(obj) {
    let authService = obj.scope.injector.get("authService");
    let fs_path = obj.scope.fs_path;
    let username = authService.get_user().username;
    let path = "/__users__/" + username;
    for (var i = 1; i < fs_path.length; i++) {
      path += "/" + fs_path[i].name;
    }
    path += "/" + obj.file.name;
    let myWindow = window.open("", "");
    let location = "/html/preventive-task/?path=" + btoa(path);
    myWindow.document.location = location;
    myWindow.focus();
  }

  /**
   * method to know if the app is needed to be shown.
   * @param {Object} d node of the tree selectionned
   * @returns {boolean}
   * @memberof SpinalDrive_App_FileExplorer_preventive-task_center
   */
  is_shown(d) {
    if (d && d.file && d.file._server_id) {
      let file = window.FileSystem._objects[d.file._server_id];
      if (
        file &&
        file instanceof File &&
        file._info.model_type &&
        (file._info.model_type.get() === "BIM Project" ||
          file._info.model_type.get() === "Digital twin")
      ) {
        return true;
      }
    }
    return false;
  }
}

//module.exports.FileExplorerpreventive-taskViewer = SpinalDrive_App_FileExplorer_preventive-task_center;

window.spinalDrive_Env.add_applications(
  "FileExplorer",
  new SpinalDrive_App_FileExplorer_preventive_task_center()
);