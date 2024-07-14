// composables/useInflection.js

export function useInflection() {
    const inflectToken = (count) => {
      if (count === 1) {
        return 'token';
      } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
        return 'tokeny';
      } else {
        return 'tokenów';
      }
    };
  
    const inflectVisualization = (count) => {
      if (count === 1) {
        return 'wizualizację';
      } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
        return 'wizualizacje';
      } else {
        return 'wizualizacji';
      }
    };
  
    return {
      inflectToken,
      inflectVisualization
    };
  }
  