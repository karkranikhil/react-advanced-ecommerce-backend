import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship, select, integer } from "@keystone-next/fields";
export const Product = list({
    //access:
    fields:{
        name:text({isRequired:true}),
        description:text({ui:{
            displayMode:'textarea'
        }}),
        photo:relationship({
            ref:'ProductImage.product',
            ui:{
                displayMode:'cards',
                cardFields:['image', 'altText'],
                inlineCreate:{fields:['image', 'altText']},
                inlineEdit:{fields:['image', 'altText']}
            }
        }),
        status:select({
            options:[
                {label:'Draft', value:'Draft'},
                {label:'Available', value:'Available'},
                {label:'Unavailable', value:'Unavailable'}
            ],
            defaultValue:'Draft',
            ui:{
                displayMode:'segmented-control',
                createView:{fieldMode:'hidden'} // this field will not be show in shortcut view
            }
        }),
        price:integer(),
        

        //Todo add roles, cart and orders
    }
})