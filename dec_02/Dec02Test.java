package dec_02;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class Dec02Test {

  @Test
  void firstStrategyTotalScore_should_return_15_when_sampleInputIsGiven() {
    assertEquals(15, Dec02.firstStrategyTotalScore("dec_02/sample-input.txt"));
  }

  @Test
  void secondStrategyTotalScore_should_return_12_when_sampleInputIsGiven() {
    assertEquals(12, Dec02.secondStrategyTotalScore("dec_02/sample-input.txt"));
  }

  @Test
  void battleScore_should_return_6_when_AY_isGiven() {
    assertEquals(6, Dec02.battleScore(new String[] {"A", "Y"}));
  }

  @Test
  void battleScore_should_return_6_when_BZ_isGiven() {
    assertEquals(6, Dec02.battleScore(new String[] {"B", "Z"}));
  }

  @Test
  void battleScore_should_return_6_when_CX_isGiven() {
    assertEquals(6, Dec02.battleScore(new String[] {"C", "X"}));
  }

  @Test
  void battleScore_should_return_0_when_AZ_isGiven() {
    assertEquals(0, Dec02.battleScore(new String[] {"A", "Z"}));
  }

  @Test
  void battleScore_should_return_0_when_BX_isGiven() {
    assertEquals(0, Dec02.battleScore(new String[] {"B", "X"}));
  }

  @Test
  void battleScore_should_return_0_when_CY_isGiven() {
    assertEquals(0, Dec02.battleScore(new String[] {"C", "Y"}));
  }

  @Test
  void battleScore_should_return_3_when_CZ_isGiven() {
    assertEquals(3, Dec02.battleScore(new String[] {"C", "Z"}));
  }

  @Test
  void decideMyChoice_should_return_A_when_AY_isGiven() {
    assertEquals("A", Dec02.decideMyChoice(new String[] { "A", "Y"}));
  }

  @Test
  void decideMyChoice_should_return_Z_when_AX_isGiven() {
    assertEquals("Z", Dec02.decideMyChoice(new String[] { "A", "X"}));
  }

  @Test
  void decideMyChoice_should_return_X_when_BX_isGiven() {
    assertEquals("X", Dec02.decideMyChoice(new String[] { "B", "X"}));
  }

  @Test
  void decideMyChoice_should_return_Y_when_CX_isGiven() {
    assertEquals("Y", Dec02.decideMyChoice(new String[] { "C", "X"}));
  }

  @Test
  void decideMyChoice_should_return_Y_when_AZ_isGiven() {
    assertEquals("Y", Dec02.decideMyChoice(new String[] { "A", "Z"}));
  }

  @Test
  void decideMyChoice_should_return_Z_when_BZ_isGiven() {
    assertEquals("Z", Dec02.decideMyChoice(new String[] { "B", "Z"}));
  }

  @Test
  void decideMyChoice_should_return_X_when_CZ_isGiven() {
    assertEquals("X", Dec02.decideMyChoice(new String[] { "C", "Z"}));
  }

}