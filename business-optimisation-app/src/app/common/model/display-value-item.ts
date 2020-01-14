/**
 * Represents item with display member (localizible) and value member (meaning value, usually some id)
 */
export class DisplayValueItem {
   displayMember: any;
   valueMember: any;
}


export class DisplayValueItemsCreator {
   public static CreateFrom(items: Array<any>, displayMember: string, valueMember: string): Array<DisplayValueItem> {
      const response = new Array<DisplayValueItem>();

      if (!items) {
         return response;
      }

      items.forEach(item => {
         const dvItem = new DisplayValueItem();
         dvItem.displayMember = item[displayMember];
         dvItem.valueMember = item[valueMember];
         // TODO: provide checking on dublication ?
         response.push(dvItem);
      });

      return response;
   }
}
