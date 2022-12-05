package dec_05;

public class Move {

  int amount;
  int from;
  int to;

  public Move(int[] moveParams) {
    amount = moveParams[0];
    from = moveParams[1] - 1;
    to = moveParams[2] - 1;
  }

  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Move)) return false;
    Move other = (Move) obj;
    return amount == other.amount && from == other.from && to == other.to;
  }

}
