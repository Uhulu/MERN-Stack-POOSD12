import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class Constellation {
  final String id;
  final int itemId;
  final String name;
  final String image;
  final String meaning;
  final String description;
  final String birthMonth;

  Constellation({
    required this.id,
    required this.itemId,
    required this.name,
    required this.image,
    required this.meaning,
    required this.description,
    required this.birthMonth,
  });
}

class Dashboard extends StatefulWidget {
  final String token;
  const Dashboard({required this.token, Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  late String email;
  List<Constellation> constellations = [];
  bool isLoading = true; // Track loading state
  String? errorMessage; // Track error message

  @override
  void initState() {
    super.initState();
    Map<String, dynamic> jwtDecodedToken = JwtDecoder.decode(widget.token);
    email = jwtDecodedToken['email'];
    fetchConstellations(); // Fetch constellations from your backend
  }

  Future<void> fetchConstellations() async {
    final url = Uri.parse('http://67.205.163.203:8080/constellations'); // Replace with your backend URL

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        List<dynamic> data = json.decode(response.body);
        setState(() {
          constellations = data.map((json) => Constellation(
            id: json['_id'],
            itemId: json['ItemID'],
            name: json['Name'],
            image: json['Image'],
            meaning: json['Meaning'],
            description: json['Description'],
            birthMonth: json['birthMonth'],
          )).toList();
          isLoading = false; // Set loading to false after data is fetched
        });
      } else {
        throw Exception('Failed to load constellations');
      }
    } catch (error) {
      setState(() {
        errorMessage = error.toString(); // Set error message
        isLoading = false; // Set loading to false on error
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/stars.jpg'), // Specify your background image here
            fit: BoxFit.cover, // Makes the image cover the entire screen
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const SizedBox(height: 16),
              const Padding(
              padding: EdgeInsets.only(top: 16.0, left: 16.0, right: 16.0),
              child: Text(
                "Constellations", // Title text
                style: TextStyle(
                  fontSize: 32, // Increased font size for the title
                  fontWeight: FontWeight.bold,
                  color: Colors.white, // Ensure the text is visible against the background
                ),
              ),
            ),
              Padding(
                padding: const EdgeInsets.only(left: 16.0, right: 16.0, bottom: 16.0),
                child: Text(
                  "Welcome $email!",
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.white, // Ensure the text is visible against the background
                  ),
                ),
              ),
              if (isLoading) // Show loading indicator
                const CircularProgressIndicator(),
                if (errorMessage != null) // Show error message if any
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Text(
                    errorMessage!,
                    style: const TextStyle(
                      fontSize: 16,
                      color: Colors.red, // Color for error message
                    ),
                  ),
                ),
              if (!isLoading && constellations.isEmpty) // Show message if no constellations found
                const Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Text(
                    'No constellations found.',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white, // Ensure visibility against the background
                    ),
                  ),
                ),
              if (!isLoading && constellations.isNotEmpty) // Show the list of constellations
                Expanded(
                  child: ListView.builder(
                    itemCount: constellations.length,
                    itemBuilder: (context, index) {
                      final constellation = constellations[index];
                      return Card(
                        margin: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Image.network(constellation.image),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text(
                                constellation.name,
                                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text('Meaning: ${constellation.meaning}'),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text('Description: ${constellation.description}'),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text('Month: ${constellation.birthMonth}'),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}