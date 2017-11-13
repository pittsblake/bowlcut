User.destroy_all
Stylist.destroy_all

#Users

users = []

user = User.create!({name: 'Taylor', email: 'taytay@gmail.com', password: 'blahblah', password_confirmation: "blahblah"})
user = User.create!({name: 'Joe', email: 'joejoe@gmail.com', password: 'blahblah', password_confirmation: "blahblah"})

# user.skip_confirmation!
# user.save!

# user = User.create!({name: 'Jay', email: 'jayjay@gmail.com', password: 'blahblah', password_confirmation: "blahblah"})

# user.skip_confirmation!
# user.save!

# 5.times do
#     users << User.create(
#         name: FFaker::Name.name,
#         email: FFaker::Internet.email,
#         password: "blahblah"
#     )
# end

#Stylists

Stylist.create({name: 'John', email: 'jonny@web.com', password: 'blahblah', description: 'Cupcake ipsum dolor sit amet. Cotton candy fruitcake lollipop topping gummies candy canes brownie pudding. Jelly toffee cake candy canes gummies sweet roll. Sugar plum cake jujubes marzipan. Wafer dessert sweet roll sesame snaps. Halvah jelly gingerbread halvah caramels cookie icing marzipan topping. Bonbon croissant macaroon wafer. Jelly cake biscuit biscuit. Marzipan biscuit danish ice cream halvah.
Cake pastry brownie chupa chups apple pie dragée toffee jujubes. Danish toffee cake chocolate cake caramels tart chupa chups marzipan. Cake brownie chupa chups. Dessert sesame snaps cake cupcake biscuit cake sweet roll. Gummies jelly-o caramels muffin dragée bear claw carrot cake. Bear claw lemon drops marzipan cookie topping.
Icing jujubes carrot cake jelly beans topping gingerbread. Soufflé topping ice cream candy canes sweet roll cake pie marshmallow marshmallow. Topping chocolate carrot cake. Gummi bears tart dragée cookie gummi bears topping gummies tootsie roll. Gummi bears tiramisu chocolate cake chocolate cake sugar plum cake pie. Jelly marshmallow gingerbread carrot cake tart sweet chocolate bar pastry sesame snaps. Gummies fruitcake pudding candy sweet muffin jujubes danish sweet. Jelly beans jelly chocolate cake chocolate cake tootsie roll ice cream. Candy canes sweet cookie dessert wafer. Fruitcake muffin pastry liquorice.', active: true, })

Stylist.create({name: 'April', email: 'april@web.com', password: 'blahblah', description: 'Cupcake ipsum dolor sit amet. Cotton candy fruitcake lollipop topping gummies candy canes brownie pudding. Jelly toffee cake candy canes gummies sweet roll. Sugar plum cake jujubes marzipan. Wafer dessert sweet roll sesame snaps. Halvah jelly gingerbread halvah caramels cookie icing marzipan topping. Bonbon croissant macaroon wafer. Jelly cake biscuit biscuit. Marzipan biscuit danish ice cream halvah.
Cake pastry brownie chupa chups apple pie dragée toffee jujubes. Danish toffee cake chocolate cake caramels tart chupa chups marzipan. Cake brownie chupa chups. Dessert sesame snaps cake cupcake biscuit cake sweet roll. Gummies jelly-o caramels muffin dragée bear claw carrot cake. Bear claw lemon drops marzipan cookie topping.
Icing jujubes carrot cake jelly beans topping gingerbread. Soufflé topping ice cream candy canes sweet roll cake pie marshmallow marshmallow. Topping chocolate carrot cake. Gummi bears tart dragée cookie gummi bears topping gummies tootsie roll. Gummi bears tiramisu chocolate cake chocolate cake sugar plum cake pie. Jelly marshmallow gingerbread carrot cake tart sweet chocolate bar pastry sesame snaps. Gummies fruitcake pudding candy sweet muffin jujubes danish sweet. Jelly beans jelly chocolate cake chocolate cake tootsie roll ice cream. Candy canes sweet cookie dessert wafer. Fruitcake muffin pastry liquorice.', active: true, })

Stylist.create({name: 'David', email: 'David@web.com', password: 'blahblah', description: 'Cupcake ipsum dolor sit amet. Cotton candy fruitcake lollipop topping gummies candy canes brownie pudding. Jelly toffee cake candy canes gummies sweet roll. Sugar plum cake jujubes marzipan. Wafer dessert sweet roll sesame snaps. Halvah jelly gingerbread halvah caramels cookie icing marzipan topping. Bonbon croissant macaroon wafer. Jelly cake biscuit biscuit. Marzipan biscuit danish ice cream halvah.
Cake pastry brownie chupa chups apple pie dragée toffee jujubes. Danish toffee cake chocolate cake caramels tart chupa chups marzipan. Cake brownie chupa chups. Dessert sesame snaps cake cupcake biscuit cake sweet roll. Gummies jelly-o caramels muffin dragée bear claw carrot cake. Bear claw lemon drops marzipan cookie topping.
Icing jujubes carrot cake jelly beans topping gingerbread. Soufflé topping ice cream candy canes sweet roll cake pie marshmallow marshmallow. Topping chocolate carrot cake. Gummi bears tart dragée cookie gummi bears topping gummies tootsie roll. Gummi bears tiramisu chocolate cake chocolate cake sugar plum cake pie. Jelly marshmallow gingerbread carrot cake tart sweet chocolate bar pastry sesame snaps. Gummies fruitcake pudding candy sweet muffin jujubes danish sweet. Jelly beans jelly chocolate cake chocolate cake tootsie roll ice cream. Candy canes sweet cookie dessert wafer. Fruitcake muffin pastry liquorice.', active: false, })