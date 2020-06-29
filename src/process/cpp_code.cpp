/*
    I wanna be the very best, like no one ever was.
*/
#include <bits/stdc++.h>
using namespace std;

int main() {
    
    int t;
    cin >> t;
    
    while(t--) {
        int i,j,k;
        int n;
        cin >> n >> k;
        
        int arr[n];
        int bmap[32]={0};
        for (i=0;i<n;i++) {
            cin >> arr[i];
            string bitarr = bitset<32>(arr[i]).to_string();
            for (j=0;j<32;j++) {
                if (bitarr[j] == '1') {
                    bmap[j]++;
                }
            }
        }
        
        printf("bmap...\n");
        for (i=0;i<32;i++) {
            printf("bmap[%2d] = %2d\n", i, bmap[i]);
        }
        
        vector< pair<int, int> > v;
        
        for (i=0;i<32;i++) {
            v.push_back(make_pair(bmap[i], i));
        }
        
        sort(v.begin(), v.end());
        int vn = v.size();
        
        int news[32]={0};
        
        for (i=0;i<k;i++) {
            int ind = v[vn-1-i].second;
            news[ind] = 1;
        }
        
        int ans = 0;
        for (i=31;i>=0;i--) {
            ans += (pow(2, 31-i) * news[i]);
        }
        
        cout << ans << "\n";
        
        
    }
    return 0;
}


// A
// #include <bits/stdc++.h>
// using namespace std;

// int main() {
    
//     int t;
//     cin >> t;
    
//     while(t--) {
//         int n,x,y;
//         cin >> x >> y >> n;
        
//         int ans = ((n / x) * x) + y;
        
//         if (ans > n) {
//             ans = (((n / x) - 1) * x) + y;
//         }
        
//         cout << ans << "\n";
        
//     }
//     return 0;
// }