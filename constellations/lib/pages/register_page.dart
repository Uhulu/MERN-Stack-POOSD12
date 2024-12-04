import 'package:flutter/material.dart';
import '../components/my_button2.dart';
import '../components/my_textfield.dart';
import '../pages/login_page.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '/config.dart';

class RegisterPage extends StatefulWidget {
  @override
  RegisterPage({super.key});
  _RegisterPage createState() => _RegisterPage();
}

class _RegisterPage extends State<RegisterPage> {
  //_RegisterPage({super.key});

  // text editing controllers
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  bool _isNotValidate = false;

  void registerUser() async{
    if (emailController.text.isNotEmpty && passwordController.text.isNotEmpty){

      var regBody = {
        "email":emailController.text,
        "password":passwordController.text
      };

      var response = await http.post(Uri.parse(registration),
      headers: {"Content-Type":"application/json"},
      body: jsonEncode(regBody)
      );

      var jsonResponse = jsonDecode(response.body);

      print(jsonResponse['status']);

      if (jsonResponse['status']){
        Navigator.push(context,MaterialPageRoute(builder: (context) => LoginPage()));
      }else{
        print("Something went wrong");
      }
    }else{
      setState(() {
        _isNotValidate = true;
      });
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
                'Register Now',
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
                  registerUser()
                },
              ),
            
              const SizedBox(height: 50),
        
              // register now
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Already have an account?',
                  style: TextStyle(color: Colors.grey[700]),
                  ),
                  const SizedBox(width: 4),
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => LoginPage())
                      );
                    },
                    child: const Text(
                      'Sign in',
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