public class linearSearch {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int target = 5;
        boolean present = false;

        // Linear Search Algorithm
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                System.out.println(i + 1); // Position (1-based index)
                present = true;
            }
        }

        if (!present) {
            System.out.println(-1);
        }
    }
}
