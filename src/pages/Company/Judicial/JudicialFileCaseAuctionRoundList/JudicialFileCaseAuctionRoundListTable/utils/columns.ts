import { ColumProps } from "@/ui/Table/Table";

export const judicialFileCaseAuctionRoundListColumns: ColumProps[] = [
  {
    id: 'judicialFileCaseAuctionList.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center' 
  },
  {
    id: 'judicialFileCaseAuctionList.datatable.header.appraisalExperts',
    title: 'PERITOS TASADORES',
    width: '20%',
    justifyContent: 'center'
  },
  {
    id: 'judicialFileCaseAuctionList.datatable.header.auctionType',
    title: 'TIPO DE REMATE',
    width: '20%',
    justifyContent: 'center'
  },
  {
    id: 'judicialFileCaseAuctionList.datatable.header.auctionerName',
    title: 'NOMBRE DEL MARTILLERO',
    width: '20%',
    justifyContent: 'center'
  }, 
  // {
  //   id: 'judicialFileCaseAuctionList.datatable.header.actions',
  //   title: 'ACCIONES',
  //   width: '10%',
  //   justifyContent: 'center'
  // }
]