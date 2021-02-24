import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'BrowseAreas.dart';
import 'MyReactions.dart';
import 'MyAreas.dart';
import 'Profile.dart';

/// This is the stateful widget that the main application instantiates.
class NavBar extends StatefulWidget {
  NavBar({Key key}) : super(key: key);

  @override
  _NavBar createState() => _NavBar();
}

// This is the private State class that goes with MyStatefulWidget.
class _NavBar extends State<NavBar> {
  int _selectedIndex = 0;

  var resp;

  List<Widget> _widgetOptions = <Widget>[
    BrowseAreas(),
    MyReactions(),
    MyAreas(),
    MyProfile()
  ];
  void _onItemTapped(int index) {
    setState(() {
      debugPrint('Selected tab:');
      debugPrint(index.toString());
      debugPrint('Token is currently:');
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[850],
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        selectedFontSize: 0,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.cloud_upload),
            label: 'Reactions',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.favorite),
            label: 'My Actions',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle),
            label: 'My Profile',
          ),
        ],
        currentIndex: _selectedIndex,
        backgroundColor: Colors.blueGrey,
        selectedItemColor: Colors.amber[800],
        unselectedItemColor: Colors.black,
        type: BottomNavigationBarType.fixed,
        onTap: _onItemTapped,
      ),
    );
  }
}
