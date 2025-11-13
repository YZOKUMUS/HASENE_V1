import 'package:flutter/material.dart';

void main() => runApp(HaseneApp());

class HaseneApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'HASENE',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'Nunito',
      ),
      home: MainMenu(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MainMenu extends StatelessWidget {
  final List<_GameMode> modes = [
    _GameMode('Ayet Oku', Icons.menu_book, Colors.teal),
    _GameMode('Dua Et', Icons.self_improvement, Colors.indigo),
    _GameMode('Hadis Oku', Icons.chrome_reader_mode, Colors.orange),
    _GameMode('Kelime Bul', Icons.search, Colors.purple),
    _GameMode('Ezberle', Icons.memory, Colors.green),
    _GameMode('Test Çöz', Icons.quiz, Colors.red),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue.shade50,
      body: SafeArea(
        child: Column(
          children: [
            SizedBox(height: 32),
            Text('HASENE', style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            Text('Hoşgeldiniz! İslami öğrenme yolculuğunuz başlıyor.', style: TextStyle(fontSize: 16)),
            SizedBox(height: 32),
            Expanded(
              child: ListView.separated(
                padding: EdgeInsets.symmetric(horizontal: 24),
                itemCount: modes.length,
                separatorBuilder: (_, __) => SizedBox(height: 16),
                itemBuilder: (context, i) => _GameButton(modes[i]),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              child: LinearProgressIndicator(
                value: 0.4, // örnek ilerleme
                backgroundColor: Colors.grey.shade300,
                color: Colors.blue,
              ),
            ),
            SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}

class _GameMode {
  final String title;
  final IconData icon;
  final Color color;
  _GameMode(this.title, this.icon, this.color);
}

class _GameButton extends StatelessWidget {
  final _GameMode mode;
  const _GameButton(this.mode);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 64,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: mode.color,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          padding: EdgeInsets.symmetric(vertical: 12),
          elevation: 2,
        ),
        onPressed: () {},
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(mode.icon, size: 32, color: Colors.white),
            SizedBox(width: 16),
            Text(mode.title, style: TextStyle(fontSize: 20, color: Colors.white)),
          ],
        ),
      ),
    );
  }
}