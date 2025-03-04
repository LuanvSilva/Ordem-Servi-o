
class Stack{
    _stack = [];
    constructor(){
        this._stack = [];
    }

    Push(element){
        this._stack.push(element);
    }

    Pop(){
        return this._stack.pop();
    }

    Peek(){
        return this._stack[this._stack.length - 1];
    }

    IsEmpty(){
        return this._stack.length === 0;
    }

    Clear(){
        this._stack = [];
    }

    Size(){
        return this._stack.length;
    }

    Print(){
        console.log(this._stack);
    }

    Contains(element){
        return this._stack.includes(element);
    }

    IndexOf(element){
        return this._stack.indexOf(element);
    }

    ToArray(){
        return this._stack.slice();
    }

    FromArray(array){
        this._stack = array;
    }

    ForEach(callback){
        this._stack.forEach(callback);
    }

    Map(callback){
        return this._stack.map(callback);
    }

    Filter(callback){
        return this._stack.filter(callback);
    }

    Reduce(callback, initialValue){
        return this._stack.reduce(callback, initialValue);
    }

    Find(callback){
        return this._stack.find(callback);
    }

    FindIndex(callback){
        return this._stack.findIndex(callback);
    }

    Some(callback){
        return this._stack.some(callback);
    }

    Every(callback){
        return this._stack.every(callback);
    }

    Sort(compareFunction){
        this._stack.sort(compareFunction);
    }

    Reverse(){
        this._stack.reverse();
    }

    Slice(start, end){
        return this._stack.slice(start, end);
    }

    Splice(start, deleteCount, ...items){
        return this._stack.splice(start, deleteCount, ...items);
    }

    Join(separator){
        return this._stack.join(separator);
    }

    ToString(){
        return this._stack.toString();
    }

    ToJSON(){
        return JSON.stringify(this._stack);
    }

    FromJSON(json){
        this._stack = JSON.parse(json);
    }
}

export { Stack }