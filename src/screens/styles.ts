import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17256B',
  },
  content: {
    flex: 1,
    backgroundColor: '#17256B',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    padding: 20,
    lineHeight: 24,
  },
  cardImage: {
    width: 300,
    height: 500,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 40,
    color: '#fff',
  }
}); 