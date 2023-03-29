
let obj = record.create({type: record.type.SALES_ORDER, isDynamic: true, })

objRecord.setValue('entity', context.entity)
objRecord.selectNewLine({ sublistId: 'item'})
objRecord.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: context.itemLine[0].item})
objRecord.setCurrentSublistValue({ sublistId: 'item', fieldId: 'quantity', value: context.itemLine[0].item})
objRecord.commitLine({ sublistId: 'item'})
const recordSave = obj.save();

        response.data.push({recordId: recordSave, recordTransaction:context.type });
        response.code = 200;
        response.success = true;
       