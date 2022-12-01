package dec_01;

import utils.FileIO;

import java.util.List;
import java.util.PriorityQueue;

public class Dec01 {

  public static void main(String[] args) {
    System.out.println(sumFirstNHighestCalories("dec_01/input.txt", 3));
  }

  private static PriorityQueue<Long> countElfCalories(List<String> fileContent) {
    PriorityQueue<Long> caloriesAtElves = new PriorityQueue<>((a, b) -> (int) (b - a));
    long calories = 0;
    for (String line : fileContent) {
      if (line.isEmpty()) {
        caloriesAtElves.add(calories);
        calories = 0;
      } else {
        calories += Long.parseLong(line);
      }
    }
    return caloriesAtElves;
  }

  private static Long sumFirstNHighestCalories(String filePath, int n) {
    List<String> fileContent = FileIO.readFile(filePath);
    PriorityQueue<Long> caloriesAtElves = countElfCalories(fileContent);
    Long sum = sumFirstNHighestCalories(caloriesAtElves, n);
    return sum;
  }

  private static Long sumFirstNHighestCalories(PriorityQueue<Long> caloriesAtElves, int n) {
    long sum = 0;
    for (int i = 0; i < n; i++) {
      if (!caloriesAtElves.isEmpty()) {
        sum += caloriesAtElves.poll();
      }
    }
    return sum;
  }

}
