$(document).ready(function() {
  console.log("script!")

      document.querySelectorAll(".vote-bttn").forEach(function (button) {
        console.log("set")
        button.onclick=function(event) {
          var postId=event.target.getAttribute("data-id")
          var direction=event.target.getAttribute("data-vote-type")

          let votes=childByClassName(event.target, "votes")
          console.log(votes)
          votes.innerHTML = +votes.innerHTML +1;
          $.post( postId+"/"+direction, {}, function(data) {
            console.log("success")
          })
          .fail(function (err) {
            console.log("error")
          })

          document.querySelectorAll('button[data-id="'+postId+'"]').forEach(function (button) {
            button.disabled="disabled"
            button.className+=" disabled"
          })
        }
      })

      $('#comment-form').bootstrapValidator({
          // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
          feedbackIcons: {
              valid: 'glyphicon glyphicon-ok',
              invalid: 'glyphicon glyphicon-remove',
              validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
            text: {
                  validators: {
                          stringLength: {
                          min: 5,
                      }
                  }
              }
            }
          })
          .on('success.form.bv', function(e) {
              $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                  $('#comment-form').data('bootstrapValidator').resetForm();

              // Prevent form submission
              e.preventDefault();

              // Get the form instance
              var $form = $(e.target);

              // Get the BootstrapValidator instance
              var bv = $form.data('bootstrapValidator');
                console.log($form.attr('action'))
                $.post( $form.attr('action'), $form.serialize(), function(data) {
                  console.log( "success" );
                  console.log(data)
                  postComment(data)
                //  announce("success", data)
                })
                .fail(function(err) {
                  console.log( "error" );
                })


          });
});
function postComment(comment) {
  var commentContainer = document.querySelector("#commentContainer")
  var commentDiv = document.createElement("div")
  commentDiv["data-commentid"]=comment.id
  commentDiv.appendChild(makeSpan(comment.user))
  commentDiv.appendChild(makeSpan(" Just Now"))
  commentDiv.appendChild(makeH3(comment.text))
//  commentDiv.appendChild(makeSpan(comment.upvotes))
//  commentDiv.appendChild(makeSpan(comment.downvotes))

  commentContainer.appendChild(commentDiv)
}
function makeSpan(text) {
  var res=document.createElement("span");
  res.appendChild(document.createTextNode(text));
  return res;
}
function makeH3(text) {
  var res=document.createElement("h3");
  res.id="commentext"
  res.appendChild(document.createTextNode(text));
  return res;
}
function childByClassName(parentElement, className) {
  var doc = parentElement;
  var res = null;
  for (var i = 0; i < doc.childNodes.length; i++) {
      if (doc.childNodes[i].className === className) {
        res = doc.childNodes[i];
        break;
      }
  }
  return res;
}
