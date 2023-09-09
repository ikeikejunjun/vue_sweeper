import CellInterface from '@/script/CellInterface';

export default class ProgressGame {
    private height: number;
    private width: number;
    private mine: number;

    constructor(height: number, width: number, mine: number) {
        this.height = height;
        this.width = width;
        this.mine = mine;
    }

    get canBeOpenedCellNum(){
        return this.width * this.height - this.mine;
    }


    /**
     * 盤面を初期化する
     * @param height 高さ
     * @param width 幅
     * @returns 盤面を返す
     */
    initRows() {
        const rows: CellInterface[][] = [];
        for (let x = 0; x < this.height; x++) {
            const row: CellInterface[] = [];
            for (let y = 0; y < this.width; y++) {
                const cell: CellInterface = {
                    hasMine: false,
                    isOpen: false,
                    isFlag: false,
                    mineCount: "",
                };
                row.push(cell);
            }
            rows.push(row);
        }
        return rows;
    }

    // 爆弾を盤面に設置する
    putMines(firstClickX: number, firstClickY: number, rows: CellInterface[][]) {
        for (let i = 0; i < this.mine; i++) {
            let doSetMine: boolean = true
            while (doSetMine) {
                const x: number = Math.floor(Math.random() * this.height);
                const y: number = Math.floor(Math.random() * this.width);
                if (!rows[x][y].hasMine && x != firstClickX && y != firstClickY) {
                    console.log('Game putMines x:' + x + ' y:' + y);
                    rows[x][y].hasMine = true;
                    doSetMine = false;
                }
            }
        }
    }

    // 爆弾の数をセットしていく
    setMinesCount(rows: CellInterface[][]) {
        rows.forEach((row, x) => {
            row.forEach((cell, y) => {
                if (!cell.hasMine) {
                    let mines: number = 0;
                    for (let i = x - 1; i <= x + 1; i++) {
                        for (let j = y - 1; j <= y + 1; j++) {
                            if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
                                if (rows[i][j].hasMine) {
                                    mines++;
                                }
                            }
                        }
                    }
                    if (mines === 0) { cell.mineCount = ""; } else {
                        cell.mineCount = mines.toString();
                    }
                }
            })
        });
    }

    // 上下左右のマスを開ける
    openAroundCells(x: number, y: number, rows: CellInterface[][]) {
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                // インデックスがはみ出していないか確認する
                if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
                    // 既に空いているか、旗が立っているマスは無視する
                    if (rows[i][j].isOpen || rows[i][j].isFlag) {
                        continue;
                    }
                    // 開けたところも空なら再帰処理
                    if (rows[i][j].mineCount === "") {
                        rows[i][j].isOpen = true;
                        this.openAroundCells(i, j, rows);
                    } else {
                        rows[i][j].isOpen = true;
                    }
                }
            }
        }
    }
}