#include<iostream>
#include<vector>
#include<unordered_map>
#include<algorithm>
#include<queue>
#include<stack>
using namespace std ;

int matrix[1000][1000] ={0} ;
void add_node(int n , vector<int>&Node){
    Node.push_back(n) ;
}

void add_edge(int head , int tail , int weight){
    matrix[head][tail] = weight ;
}

int min(vector<int> &dist , vector<int>& visited){

int Min = INT_MAX ;
int node = -1;
for(int i = 0 ; i<dist.size() ; i++){
    if(!visited[i]){
        if(dist[i]<Min){
            Min = dist[i] ;
            node = i ;
        }
    }
}
return node ;
}



int dijisktra(vector<int> &visited , int source , int destination , int n ){
   
    vector<int> dist(n,INT_MAX/2) ;
    dist[source] =  0 ;
    int count = 0 ;

    while(count != n ){
    int node = min(dist,visited) ;
    visited[node]  =1 ;
    count++ ;

    if(node == -1)
     break ;

    for(int i=0 ; i<n ; i++){
        if(matrix[node][i] && dist[node]+matrix[node][i] < dist[i] ){
            dist[i] =  dist[node]+matrix[node][i] ;
        }
    }
 }
return dist[destination] ;
}


vector<int>  BFS(int start  ,int max){
queue<int> q ;
int visited[1000] ={0} ;
q.push(start); 
visited[start] = 1 ;
vector<int>display  ;

while(!q.empty()){
int x = q.front() ;
display.push_back(x) ;
q.pop();

for(int i= 0; i<=max ; i++){
    if(!visited[i] && matrix[x][i]){
        q.push(i);
        visited[i] = 1 ;
    }
}

}
return display ;

}



vector<int>display ;

void DFS(int start ,int max , vector<int>& visited){
    
    visited[start] = 1 ;
    display.push_back(start) ;
    int flag = 0 ;
    for(int i=0 ; i<=max ; i++){
      if(matrix[start][i] >0 && !visited[i])
            DFS(i, max , visited) ;
       }
       return ;
    }






int main(){
vector<int>visited(1000) ;
vector<int>nodes ;

cout <<" Select Nodes : From 0 to 1000 : Press 0 to exit selection"<<endl;
int input = 1 ;
int count =0 ;
int max = INT_MIN ;
while(input != -1){
    cin>>input ;
    if(input){
       nodes.push_back(input) ;
       if(input>max)
            max = input  ;
    }
}


cout <<" Add edges :  Press -1 to exit selection"<<endl;

input = 1 ;
    int u , v, w ;
      cout << "Add Edge : (u,v , weight, input) format "<<endl ; 
while(input != -1){
    cout <<"Add(1)/Stop(-1) : "<<endl;
    cin >>input ;
    cout <<" Add Egde (u, v, W) : "<<endl ;
    cin >>u>>v>>w;
    add_edge(u,v,w) ;
}

cout << " Select Source : "<<endl ;
cin >> u ; 
cout << " Select Destination : "<<endl ;
cin >> v ; 

int max = dijisktra(visited ,u,v,nodes.size()) ;
cout <<" Distance btw Source and Destination is : "<<max ;

return 0 ;
}