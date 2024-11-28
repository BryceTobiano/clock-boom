
"use client"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
const Collapsible = CollapsiblePrimitive.Root
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent
export { Collapsible, CollapsibleTrigger, CollapsibleContent }

  export default function CompletedDropdown(){

    return (  
        <Collapsible>
        <CollapsibleTrigger style={{border:"0", backgroundColor:"#d1fae5", color:"#065f46", fontFamily:"Saira", fontSize:"16px"}}>Completed: 4</CollapsibleTrigger>
        <CollapsibleContent>
            <ul style={{marginLeft:"20px"}}>
                <li>Project 1</li>
                <li>Project 2</li>
            </ul>
        </CollapsibleContent>
      </Collapsible>
    )
}