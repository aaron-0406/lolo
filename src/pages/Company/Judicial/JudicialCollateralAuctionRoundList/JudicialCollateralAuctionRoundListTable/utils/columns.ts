import { ColumProps } from "@/ui/Table/Table";

export const judicialCollateralAuctionRoundListColumns: ColumProps[] = [
  {
    id: 'judicialCollateralAuctionList.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center' 
  },
  {
    id: 'judicialCollateralAuctionList.datatable.header.appraisalExperts',
    title: 'PERITOS TASADORES',
    width: '20%',
    justifyContent: 'center'
  },
  {
    id: 'judicialCollateralAuctionList.datatable.header.auctionType',
    title: 'TIPO DE REMATE',
    width: '20%',
    justifyContent: 'center'
  },
  {
    id: 'judicialCollateralAuctionList.datatable.header.auctionerName',
    title: 'NOMBRE DEL MARTILLERO',
    width: '20%',
    justifyContent: 'center'
  }, 
  {
    id: 'judicialCollateralAuctionList.datatable.header.actions',
    title: 'ACCIONES',
    width: '10%',
    justifyContent: 'center'
  }
]