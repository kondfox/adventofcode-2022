package dec_03;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class Dec03Test {

  @Test
  void calculateSumPriorities_should_return_157_when_sampleInputIsGiven() {
    assertEquals(157, Dec03.calculateSumPriorities("dec_03/sample-input.txt"));
  }

  @Test
  void calculateSumBadgePriorities_should_return_70_when_sampleInputIsGiven() {
    assertEquals(70, Dec03.calculateSumBadgePriorities("dec_03/sample-input.txt"));
  }

  @Test
  void calculatePriority_should_return_16_when_vJrwpWtwJgWrhcsFMMfFFhFp_isGiven() {
    assertEquals(16, Dec03.calculatePriority("vJrwpWtwJgWrhcsFMMfFFhFp"));
  }

  @Test
  void calculatePriority_should_return_38_when_jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL_isGiven() {
    assertEquals(38, Dec03.calculatePriority("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL"));
  }

  @Test
  void findTheCommonLetter_should_return_p_when_vJrwpWtwJgWr_and_hcsFMMfFFhFp_isGiven() {
    assertEquals("p", Dec03.findTheCommonLetter("vJrwpWtwJgWr", "hcsFMMfFFhFp"));
  }

  @Test
  void findTheCommonLetter_should_return_L_when_jqHRNqRjqzjGDLGL_and_rsFMfFZSrLrFZsSL_isGiven() {
    assertEquals("L", Dec03.findTheCommonLetter("jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL"));
  }

}