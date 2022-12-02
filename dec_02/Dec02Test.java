package dec_02;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class Dec02Test {

  @Test
  void firstStrategyTotalScore_should_return15_when_sampleInputIsGiven() {
    assertEquals(15, Dec02.firstStrategyTotalScore("dec_02/sample-input.txt"));
  }

  @Test
  void secondStrategyTotalScore_should_return12_when_sampleInputIsGiven() {
    assertEquals(12, Dec02.secondStrategyTotalScore("dec_02/sample-input.txt"));
  }

  @Test
  void firstStrategyBattleScore_should_return6_when_AYIsGiven() {
    assertEquals(6, Dec02.firstStrategyBattleScore(new String[] {"A", "Y"}));
  }

  @Test
  void firstStrategyBattleScore_should_return6_when_BZIsGiven() {
    assertEquals(6, Dec02.firstStrategyBattleScore(new String[] {"B", "Z"}));
  }

  @Test
  void firstStrategyBattleScore_should_return6_when_CXIsGiven() {
    assertEquals(6, Dec02.firstStrategyBattleScore(new String[] {"C", "X"}));
  }

  @Test
  void firstStrategyBattleScore_should_return0_when_AZIsGiven() {
    assertEquals(0, Dec02.firstStrategyBattleScore(new String[] {"A", "Z"}));
  }

  @Test
  void firstStrategyBattleScore_should_return0_when_BXIsGiven() {
    assertEquals(0, Dec02.firstStrategyBattleScore(new String[] {"B", "X"}));
  }

  @Test
  void firstStrategyBattleScore_should_return0_when_CYIsGiven() {
    assertEquals(0, Dec02.firstStrategyBattleScore(new String[] {"C", "Y"}));
  }

  @Test
  void firstStrategyBattleScore_should_return3_when_CZIsGiven() {
    assertEquals(3, Dec02.firstStrategyBattleScore(new String[] {"C", "Z"}));
  }

  @Test
  void decideMyChoice_should_returnA_when_AYIsGiven() {
    assertEquals("A", Dec02.decideMyChoice(new String[] { "A", "Y"}));
  }

  @Test
  void decideMyChoice_should_returnZ_when_AXIsGiven() {
    assertEquals("Z", Dec02.decideMyChoice(new String[] { "A", "X"}));
  }

  @Test
  void decideMyChoice_should_returnX_when_BXIsGiven() {
    assertEquals("X", Dec02.decideMyChoice(new String[] { "B", "X"}));
  }

  @Test
  void decideMyChoice_should_returnY_when_CXIsGiven() {
    assertEquals("Y", Dec02.decideMyChoice(new String[] { "C", "X"}));
  }

  @Test
  void decideMyChoice_should_returnY_when_AZIsGiven() {
    assertEquals("Y", Dec02.decideMyChoice(new String[] { "A", "Z"}));
  }

  @Test
  void decideMyChoice_should_returnZ_when_BZIsGiven() {
    assertEquals("Z", Dec02.decideMyChoice(new String[] { "B", "Z"}));
  }

  @Test
  void decideMyChoice_should_returnX_when_CZIsGiven() {
    assertEquals("X", Dec02.decideMyChoice(new String[] { "C", "Z"}));
  }

}