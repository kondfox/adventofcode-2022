package dec_02;

import utils.FileIO;

import java.util.function.Function;

public class Dec02 {

  public static void main(String[] args) {
    System.out.println(firstStrategyTotalScore("dec_02/input.txt"));
    System.out.println(secondStrategyTotalScore("dec_02/input.txt"));
  }

  public static long firstStrategyTotalScore(String filePath) {
    return totalScore(filePath, Dec02::firstStrategyMatchScore);
  }

  public static long secondStrategyTotalScore(String filePath) {
    return totalScore(filePath, Dec02::secondStrategyMatchScore);
  }

  public static long totalScore(String filePath, Function<String[], Integer> strategy) {
    return FileIO.readFile(filePath).parallelStream()
            .map(s -> s.split(" "))
            .mapToInt(strategy::apply)
            .sum();
  }

  private static int firstStrategyMatchScore(String[] choices) {
    return matchScore(choices, choices[1]);
  }

  private static int secondStrategyMatchScore(String[] choices) {
    String myChoice = decideMyChoice(choices);
    return matchScore(choices, myChoice);
  }

  private static int matchScore(String[] choices, String myChoice) {
    int choiceScore = choiceScore(myChoice);
    int battleScore = battleScore(choices);
    return choiceScore + battleScore;
  }

  public static String decideMyChoice(String[] choices) {
    int opponentChoice = choices[0].charAt(0) - 'A';
    if (choices[1].equals("X")) {
      return String.valueOf((char)(((opponentChoice + 2) % 3) + 'X'));
    } else if (choices[1].equals("Y")) {
      return choices[0];
    } else {
      return String.valueOf((char)(((opponentChoice + 1) % 3) + 'X'));
    }
  }

  private static int choiceScore(String choice) {
    char c = choice.charAt(0);
    return c - (c < 'X' ? 'A' : 'X') + 1;
  }

  public static int battleScore(String[] choices) {
    int opponentScore = choiceScore(choices[0]);
    int myScore = choiceScore(choices[1]);
    int diff = myScore - opponentScore;
    if (diff == 1 || diff == -2) {
      return 6;
    } else if (diff == 0) {
      return 3;
    } else {
      return 0;
    }
  }

}
