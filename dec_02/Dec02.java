package dec_02;

import utils.FileIO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Dec02 {

  public static void main(String[] args) {
    System.out.println(firstStrategyTotalScore("dec_02/input.txt"));
    System.out.println(secondStrategyTotalScore("dec_02/input.txt"));
  }

  public static long firstStrategyTotalScore(String filePath) {
    List<String> fileContent = FileIO.readFile(filePath);
    long totalScore = fileContent.parallelStream()
            .mapToLong(Dec02::firstStrategyMatchScore)
            .sum();
    return totalScore;
  }

  public static long secondStrategyTotalScore(String filePath) {
    List<String> fileContent = FileIO.readFile(filePath);
    long totalScore = fileContent.parallelStream()
            .mapToLong(Dec02::secondStrategyMatchScore)
            .sum();
    return totalScore;
  }

  private static int firstStrategyMatchScore(String line) {
    String[] choices = line.split(" ");
    int choiceScore = findChoiceScore(choices[1]);
    int battleScore = firstStrategyBattleScore(choices);
    return choiceScore + battleScore;
  }

  private static int secondStrategyMatchScore(String line) {
    String[] choices = line.split(" ");
    String myChoice = decideMyChoice(choices);
    int choiceScore = findChoiceScore(myChoice);
    int battleScore = firstStrategyBattleScore(new String[] { choices[0], myChoice});
    return choiceScore + battleScore;
  }

  public static String decideMyChoice(String[] choices) {
    int opponentChoice = choices[0].charAt(0) - 65;
    if (choices[1].equals("X")) {
      return String.valueOf((char)(((opponentChoice + 2) % 3) + 88));
    } else if (choices[1].equals("Y")) {
      return choices[0];
    } else {
      return String.valueOf((char)(((opponentChoice + 1) % 3) + 88));
    }
  }

  private static int findChoiceScore(String choice) {
    Map<String, Integer> choiceScores = new HashMap<String, Integer>() {{
      put("A", 1);
      put("B", 2);
      put("C", 3);
      put("X", 1);
      put("Y", 2);
      put("Z", 3);
    }};
    return choiceScores.get(choice);
  }

  public static int firstStrategyBattleScore(String[] choices) {
    int opponentScore = findChoiceScore(choices[0]);
    int myScore = findChoiceScore(choices[1]);
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
