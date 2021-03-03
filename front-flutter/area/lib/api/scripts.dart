import 'dart:async';
import 'dart:convert';
import 'package:area/api/GlobalNetwork.dart';
import 'package:http/http.dart' as http;
import 'package:area/api/class/area.dart';

Future<Map<String, dynamic>> getUserScripts() async {
  final response = await http.get(urlArea + '/user/scripts', headers: headers);

  Map<String, dynamic> areas = jsonDecode(response.body);
  if (response.statusCode == 200) {
    return areas;
  } else {
    areas['error'] = true;
    return areas;
  }
}

Future<bool> getScriptDelete(String scriptID) async {
  final response = await http.get(urlArea + '/script/delete?id=' + scriptID, headers: headers);
  Map<String, dynamic> areas = jsonDecode(response.body);
  if (response.statusCode == 200) {
    return true;
  } else {
    areas['error'] = true;
    return false;
  }
}

Future<bool> updateScriptActivation(String scriptID, bool activated) async {
  String activatedString = "";
  if (activated == true) {
    activatedString = "true";
  } else {
    activatedString = "false";
  }
  final response = await http.get(urlArea + '/script/activate?id=' + scriptID + "&activated=" + activatedString, headers: headers);
  Map<String, dynamic> areas = jsonDecode(response.body);
  if (response.statusCode == 200) {
    return true;
  } else {
    areas['error'] = true;
    return false;
  }
}

Future<bool> postScriptCreate(ScriptCreation script) async {
  Map<String, dynamic> body = script.toJson();
  final msg = jsonEncode(body);
  print("Creating script");
  final response = await http.post(urlArea + '/script/create', headers: headers, body: msg);

  if (response.statusCode == 200) {
    return true;
  } else {
    return false;
  }
}

Future<Map<String, dynamic>> getActionAvailable() async {
  final response = await http.get(urlArea + '/action/available', headers: headers);

  Map<String, dynamic> userinfo = jsonDecode(response.body);
  //print(userinfo);
  if (response.statusCode == 200) {
    return userinfo;
  } else {
    userinfo['error'] = true;
    return userinfo;
  }
}

Future<Map<String, dynamic>> getReactionAvailable() async {
  final response = await http.get(urlArea + '/reaction/available', headers: headers);

  Map<String, dynamic> userinfo = jsonDecode(response.body);
  if (response.statusCode == 200) {
    return userinfo;
  } else {
    userinfo['error'] = true;
    return userinfo;
  }
}
