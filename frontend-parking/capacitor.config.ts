import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.parking',
  appName: 'Parking',
  webDir: 'build',
  server: {
    androidScheme: 'http',  // Cambiado a http
    cleartext: true,
    hostname: '192.168.50.186:3000',  // Cambia por la dirección IP de tu servidor
  }
};

export default config;
