import 'package:flutter/material.dart';

class MyTextField extends StatelessWidget {
  final TextEditingController controller; // Strongly typed
  final String hintText;
  final bool obscureText;
  final String? errorText; // Added errorText property for validation feedback

  const MyTextField({
    super.key,
    required this.controller,
    required this.hintText,
    required this.obscureText,
    this.errorText, // Optional parameter
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 25.0),
      child: TextField(
        controller: controller,
        obscureText: obscureText,
        decoration: InputDecoration(
          enabledBorder: const OutlineInputBorder(
            borderSide: BorderSide(color: Colors.white),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.grey),
          ),
          fillColor: Colors.grey.shade200,
          filled: true,
          hintText: hintText,
          hintStyle: TextStyle(color: Colors.grey[500]),
          errorText: errorText, // Dynamically display error text
        ),
      ),
    );
  }
}