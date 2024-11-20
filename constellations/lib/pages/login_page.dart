import 'package:flutter/material.dart';

import '../components/my_button.dart';
import '../components/my_textfield.dart';



class LoginPage extends StatelessWidget {
  LoginPage({super.key});

  // text editing controllers
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();

  void signUserIn() {}

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
                size: 100,
              ),
        
              const SizedBox(height: 50),
        
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
                controller: usernameController,
                hintText: 'Username',
                obscureText: false,
              ),
            
              const SizedBox(height: 10),
            
              // password
              MyTextField(
                controller: passwordController,
                hintText: 'Password',
                obscureText: true,
              ),
        
              const SizedBox(height: 10),
        
              // forgot password
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Text(
                      'Forgot Password?',
                      style: TextStyle(color: Colors.grey[600]),
                      ),
                  ],
                ),
              ),
        
              const SizedBox(height: 25),
        
              // sign in button
              MyButton(
                onTap: signUserIn,
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