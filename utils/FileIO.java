package utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class FileIO {

  public static List<String> readFile(String filePath) {
    Path path = Paths.get(filePath);
    try {
      return Files.readAllLines(path);
    } catch (IOException e) {
      System.out.printf("Unable to read file: %s\n", filePath);
      return new ArrayList<>();
    }
  }

}
