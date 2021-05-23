---
title: nest로 excel 만들기
date: 2021-05-24 01:05:35
category: backend
tags: []
draft: true
---

```ts
@Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
)
@Header('Content-Disposition', 'attachment; filename=users.xlsx')
@Get('orders/excel/:id')
async getOrderListExcel(
    @Param('id') id: string,
    @Query('name') name: string,
    @Res() res: Response,
  ): Promise<any> {
    const { access } = await this.appService.getToken();
    if (!access) {
      return { data: 'Error' };
    }
    try {
      const obj = [
        {
          이름: 'yuni',
        },
        {
          이름: 'q',
        }];
      const wb = XLSX.utils.book_new();
      const newWorksheet = XLSX.utils.json_to_sheet(newOrders);
      XLSX.utils.book_append_sheet(wb, obj, 'excel');
      const wbOptions = { bookType: 'xlsx', type: 'base64' } as any;
      const wbout = XLSX.write(wb, wbOptions);
      res.end(Buffer.from(wbout, 'base64'));
    } catch (e) {
      console.log('Error');
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }
```
