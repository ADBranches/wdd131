##  *(UML/Flowcharts)*

### **A. AR Demo Workflow**
```mermaid
sequenceDiagram
    User->>Browser: Uploads Image
    Browser->>JavaScript: FileReader API
    JavaScript->>DOM: Apply CSS Filters
    DOM-->>User: Display AR Preview
    JavaScript->>localStorage: Save Image
```

### **B. Quiz Logic Flow**
```mermaid
graph TD
    A[Start Quiz] --> B{Question 1: Use Case?}
    B -->|Shopping| C[Recommend "IKEA Place"]
    B -->|Education| D[Recommend "JigSpace"]
    C --> E[Display Result]
    D --> E
```

