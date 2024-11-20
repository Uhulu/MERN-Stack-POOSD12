import 'package:flutter/material.dart';
import 'pages/login_page.dart';
import 'package:constellations/routes/routes.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(),
      routes: Routes.getroutes,
    );
  }
}

