package dec_04;

import utils.FileIO;

import java.util.Arrays;
import java.util.List;

public class Dec04 {

  public static void main(String[] args) {
    System.out.println(countFullOverlaps("dec_04/input.txt"));
    System.out.println(countOverlaps("dec_04/input.txt"));
  }

  public static long countFullOverlaps(String filePath) {
    List<String> fileContent = FileIO.readFile(filePath);
    long fullOverlaps = fileContent.parallelStream()
            .filter(Dec04::isFullyOverlapping)
            .count();
    return fullOverlaps;
  }

  public static long countOverlaps(String filePath) {
    List<String> fileContent = FileIO.readFile(filePath);
    long fullOverlaps = fileContent.parallelStream()
            .filter(Dec04::isOverlapping)
            .count();
    return fullOverlaps;
  }

  public static boolean isFullyOverlapping(String line) {
    String[] ranges = line.split(",");
    int[] range1 = toIntArray(ranges[0].split("-"));
    int[] range2 = toIntArray(ranges[1].split("-"));
    boolean isOverlapping = isFullyOverlapping(range1, range2) || isFullyOverlapping(range2, range1);
    return isOverlapping;
  }

  public static boolean isOverlapping(String line) {
    String[] ranges = line.split(",");
    int[] range1 = toIntArray(ranges[0].split("-"));
    int[] range2 = toIntArray(ranges[1].split("-"));
    int[][] orderedRanges = orderRanges(range1, range2);
    boolean isOverlapping = isOverlapping(orderedRanges[0], orderedRanges[1]);
    return isOverlapping;
  }

  public static boolean isFullyOverlapping(int[] range1, int[] range2) {
    if (range1[0] <= range2[0] && range1[1] >= range2[1]) return true;
    if (range1[0] >= range2[0] && range1[1] <= range2[1]) return true;
    return false;
  }

  public static boolean isOverlapping(int[] range1, int[] range2) {
    return range1[1] >= range2[0];
  }

  public static int[][] orderRanges(int[] range1, int[] range2) {
    if (range1[0] < range2[0]) return new int[][] { range1, range2 };
    return new int[][] { range2, range1 };
  }

  private static int[] toIntArray(String[] stringArray) {
    return Arrays.stream(stringArray)
            .mapToInt(Integer::parseInt)
            .toArray();
  }

}
