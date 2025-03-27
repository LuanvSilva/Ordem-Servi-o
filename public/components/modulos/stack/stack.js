
class Stack{
    #stack = []
    constructor(index){
        this.SetIndex(index)
        this.#stack = []
    }

    SetStack(stack) {
        this.#stack = Array.isArray(stack) ? [...stack] : []
    }

    GetStack(){
        return [...this.#stack]
    }

    GetIndexStack(index){
        return this.#stack[index || this.index]
    }

    SetIndexStack(index, element) {
        this.#stack[index || this.index] = element
    }

    SetIndex(index = 0) { 
        this.index = Number(index)
    }

    Push(element){
        this.#stack.push(element)
    }

    Pop(){
        return this.#stack.pop()
    }

    Peek(){
        return this.#stack[this.#stack.length - 1]
    }

    IsEmpty(){
        return this.#stack.length === 0
    }

    Clear(){
        this.#stack = []
    }

    Size(){
        return this.#stack.length
    }

    Print(){
        console.log(this.#stack)
    }

    Contains(element){
        return this.#stack.includes(element)
    }

    IndexOf(element){
        return this.#stack.indexOf(element)
    }

    ToArray(){
        return this.#stack.slice()
    }

    FromArray(array){
        this.#stack = array
    }

    ForEach(callback){
        this.#stack.forEach(callback)
    }

    Map(callback){
        return this.#stack.map(callback)
    }

    Filter(callback){
        return this.#stack.filter(callback)
    }

    Reduce(callback, initialValue){
        return this.#stack.reduce(callback, initialValue)
    }

    Find(callback){
        return this.#stack.find(callback)
    }

    FindIndex(callback){
        return this.#stack.findIndex(callback)
    }

    Some(callback){
        return this.#stack.some(callback)
    }

    Every(callback){
        return this.#stack.every(callback)
    }

    Sort(compareFunction){
        this.#stack.sort(compareFunction)
    }

    Reverse(){
        this.#stack.reverse()
    }

    Slice(start, end){
        return this.#stack.slice(start, end)
    }

    Splice(start, deleteCount, ...items){
        return this.#stack.splice(start, deleteCount, ...items)
    }

    Join(separator){
        return this.#stack.join(separator)
    }

    ToString(){
        return this.#stack.toString()
    }

    ToJSON(){
        return JSON.stringify(this.#stack)
    }

    FromJSON(json){
        this.#stack = JSON.parse(json)
    }
}

export { Stack }