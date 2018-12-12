import React from 'react'

const Item = React.lazy(() => import(/* webpackChunkName: 'Item' */ '../Item'))

const URL1 =
  'https://statics.memondo.com/p/s1/vefs/2018/12/VEF_503957_c1c4d96910124b2b8226e7a3dacc9d62_twitter_dudas_existenciales_por_jorgesuareza13.jpg'
const URL2 =
  'https://statics.memondo.com/p/s1/ccs/2018/12/CC_2708491_d77b7ffe0e7347d2a3811f632c81258c_meme_otros_melania_y_sus_fantasias_rusas.jpg?cb=2125078'

const URL3 =
  'https://statics.memondo.com/p/s1/ccs/2018/12/CC_2708477_d9ab2d364b584b9198f6bc59849d7cbf_a_nadie_le_importa_la_verdad_que_todos_sabemos.jpg?cb=3143002'

const URL4 =
  'https://statics.memondo.com/p/s1/ccs/2018/12/CC_2708410_45850172796341609ed0f350da0fe806_meme_otros_me_suena_de_algo_tu_cara_y_no_dire_de_donde.jpg?cb=6303164'

const Grid = () => (
  <div className="Grid">
    <Item urlImage={URL1} alt="A very exciting yacht race." />
    <Item urlImage={URL2} alt="A very exciting yacht race." />
    <Item urlImage={URL3} alt="A very exciting yacht race." />
    <Item urlImage={URL4} alt="A very exciting yacht race." />
  </div>
)

Grid.displayName = 'Grid'

export default Grid
