public class binarySearch {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int target = 5;
        int low = 0;
        int high = arr.length - 1;
        boolean present = false;

        // Binary Search Algorithm
        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                System.out.println(mid + 1); // 1-based index
                present = true;
                break;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        if (!present) {
            System.out.println(-1);
        }
    }
}
