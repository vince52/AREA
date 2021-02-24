import 'package:flutter/material.dart';
import 'package:area/Screens/Login/login_screen.dart';
import 'package:area/Screens/Signup/components/background.dart';
import 'package:area/Screens/Signup/components/or_divider.dart';
import 'package:area/Screens/Signup/components/social_icon.dart';
import 'package:area/components/already_have_an_account_acheck.dart';
import 'package:area/components/rounded_button.dart';
import 'package:area/components/rounded_input_field.dart';
import 'package:area/components/rounded_password_field.dart';
import 'package:area/api/auth.dart';
import 'package:flutter_svg/svg.dart';

class Body extends StatelessWidget {
  String email;
  String password;
  String cpassword;

  Body({
    Key key,
    this.email,
    this.password,
  }) : super(key: key);

  errorMatchAlertDialog(BuildContext context) {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("Passwords do not match"),
          content: Icon(
            Icons.block,
            color: Colors.redAccent,
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Background(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "SIGNUP",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(height: size.height * 0.03),
            SvgPicture.asset(
              "assets/icons/Area.svg",
              height: size.height * 0.35,
            ),
            RoundedInputField(
              hintText: "Your Email",
              onChanged: (value) {
                email = value;
              },
            ),
            RoundedPasswordField(
              hintText: "Password",
              onChanged: (value) {
                password = value;
              },
            ),
            RoundedPasswordField(
              hintText: "Confirm Password",
              onChanged: (value) {
                cpassword = value;
              },
            ),
            RoundedButton(
              text: "SIGNUP",
              press: () {
                if (password == cpassword)
                  signup(email, password);
                else
                  errorMatchAlertDialog(context);
              },
            ),
            SizedBox(height: size.height * 0.03),
            AlreadyHaveAnAccountCheck(
              login: false,
              press: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return LoginScreen();
                    },
                  ),
                );
              },
            ),
            OrDivider(),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                SocalIcon(
                  iconSrc: "assets/icons/facebook.svg",
                  press: () {},
                ),
                SocalIcon(
                  iconSrc: "assets/icons/twitter.svg",
                  press: () {},
                ),
                SocalIcon(
                  iconSrc: "assets/icons/google-plus.svg",
                  press: () {},
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
