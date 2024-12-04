import 'package:flutter/material.dart';
import '../components/my_button.dart';
import '../components/my_textfield.dart';
import '../pages/register_page.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '/config.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../dashboard.dart';


class LoginPage extends StatefulWidget {
  @override
  LoginPage({super.key});
  _LoginPage createState() => _LoginPage();
}

class _LoginPage extends State<LoginPage> {
  //LoginPage({super.key});

  // text editing controllers
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  bool _isNotValidate = false;
  late SharedPreferences prefs;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    initSharedPref();
  }

void initSharedPref() async {
    prefs = await SharedPreferences.getInstance();
}

  void loginUser() async{
    if (emailController.text.isNotEmpty && passwordController.text.isNotEmpty){

      var regBody = {
        "email":emailController.text,
        "password":passwordController.text
      };

      var response = await http.post(Uri.parse(login),
      headers: {"Content-Type":"application/json"},
      body: jsonEncode(regBody)
      );

      var jsonResponse = jsonDecode(response.body);
      if (jsonResponse['status']){
          var myToken = jsonResponse['token'];
          prefs.setString('token', myToken);
          Navigator.push(context, MaterialPageRoute(builder: (context)=>Dashboard(token: myToken)));
      }else{
        print('Something went wrong');
      }

    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SingleChildScrollView(
        child: SafeArea(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
              const SizedBox(height: 50),
        
              // logo
              const Icon(
                Icons.star,
                size: 150,
              ),
        
              const SizedBox(height: 10),
        
              // title
              Text(
                'Constellations',
                style: TextStyle(
                  color: Colors.grey[700],
                  fontSize: 32,
                ),
              ),
            
              const SizedBox(height: 25),
        
              // username
              MyTextField(
                controller: emailController,
                hintText: 'Email',
                obscureText: false,
                errorText: _isNotValidate ? "Enter Proper Info" : null,
              ),
            
              const SizedBox(height: 10),
            
              // password
              MyTextField(
                controller: passwordController,
                hintText: 'Password',
                obscureText: true,
                errorText: _isNotValidate ? "Enter Proper Info" : null,
              ),
        
              const SizedBox(height: 10),
        
              // // forgot password
              // Padding(
              //   padding: const EdgeInsets.symmetric(horizontal: 25.0),
              //   child: Row(
              //     mainAxisAlignment: MainAxisAlignment.end,
              //     children: [
              //       Text(
              //         'Forgot Password?',
              //         style: TextStyle(color: Colors.grey[600]),
              //         ),
              //     ],
              //   ),
              // ),
        
              const SizedBox(height: 25),
        
              // sign in button
              MyButton(
                onTap: ()=>{
                    loginUser()
                },
              ),
            
              const SizedBox(height: 50),
        
              // register now
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Not a member?',
                  style: TextStyle(color: Colors.grey[700]),
                  ),
                  const SizedBox(width: 4),
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => RegisterPage()),
                      );
                    },
                    child: const Text(
                      'Register now',
                    style: TextStyle(
                      color: Colors.blue, 
                      fontWeight: FontWeight.bold
                      ),
                    ),
                  ),
                ],
              ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}